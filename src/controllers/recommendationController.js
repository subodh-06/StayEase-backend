const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

// Configure OpenAI
const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

// @desc    AI-powered personalized room recommendations
// @route   POST /api/recommendations/rooms
// @access  Private
exports.getRoomRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user booking history
        const bookings = await Booking.find({ user: userId }).populate("room");
        const previousRooms = bookings.map(booking => booking.room);

        // Get available rooms
        const availableRooms = await Room.find({ available: true });

        if (!availableRooms.length) {
            return res.status(404).json({ message: "No available rooms found." });
        }

        // Prepare data for AI recommendation
        const roomDescriptions = availableRooms.map(room => ({
            name: room.name,
            price: room.price,
            amenities: room.amenities.join(", "),
            type: room.type
        }));

        const prompt = `
            Based on the user's previous stays and preferences, recommend the best room from the available options.
            - User's previous stays: ${JSON.stringify(previousRooms)}
            - Available rooms: ${JSON.stringify(roomDescriptions)}
            
            Provide a JSON response with the best room recommendation and the reason.
        `;

        // Call OpenAI API
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
        });

        // Parse and return recommendation
        res.json(JSON.parse(response.data.choices[0].message.content.trim()));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
