const { Configuration, OpenAIApi } = require("openai");
const Room = require("../models/roomModel"); // Assuming we have a Room model
require("dotenv").config();

// Configure OpenAI
const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

// @desc    AI-powered Smart Room Allocation
// @route   POST /api/rooms/allocate
// @access  Private (Hotel Owners)
exports.suggestRoomAllocation = async (req, res) => {
    try {
        const { guestPreferences, bookingHistory } = req.body;

        if (!guestPreferences) {
            return res.status(400).json({ message: "Guest preferences are required" });
        }

        // Fetch available rooms
        const availableRooms = await Room.find({ status: "available" });

        if (availableRooms.length === 0) {
            return res.status(404).json({ message: "No available rooms at the moment." });
        }

        const prompt = `
            You are an AI system helping hotel owners allocate the best room for a guest.
            Consider the following:
            - Guest Preferences: ${JSON.stringify(guestPreferences)}
            - Booking History: ${JSON.stringify(bookingHistory)}
            - Available Rooms: ${JSON.stringify(availableRooms)}

            Suggest the best room for the guest based on these factors.
        `;

        // Call OpenAI API
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
        });

        res.json({ recommendedRoom: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
