const { Configuration, OpenAIApi } = require("openai");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
require("dotenv").config();

// Configure OpenAI
const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

// @desc    Get AI-powered room recommendations
// @route   GET /api/ai/recommendations
// @access  Private
exports.getRoomRecommendations = async (req, res) => {
    try {
        // Get user booking history
        const bookings = await Booking.find({ user: req.user.id }).populate("room");
        if (!bookings.length) {
            return res.status(400).json({ message: "No booking history found to generate recommendations." });
        }

        // Extract room types from past bookings
        const pastRoomTypes = bookings.map(booking => booking.room.type);
        const mostBookedType = pastRoomTypes.sort((a, b) =>
            pastRoomTypes.filter(v => v === a).length - pastRoomTypes.filter(v => v === b).length
        ).pop();

        // Fetch available rooms similar to the user's preferences
        const availableRooms = await Room.find({ type: mostBookedType, isBooked: false });

        if (availableRooms.length === 0) {
            return res.status(404).json({ message: "No similar rooms available at the moment." });
        }

        // Prepare prompt for OpenAI
        const prompt = `Suggest a hotel room based on the user's past preferences. The user usually books ${mostBookedType} rooms. Available options:\n${availableRooms
            .map(room => `- ${room.type} room at price ${room.price} in hotel ID ${room.hotel}`)
            .join("\n")}`;

        // Call OpenAI API
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
        });

        // Return AI suggestions
        res.json({
            recommendations: response.data.choices[0].message.content,
            availableRooms,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
