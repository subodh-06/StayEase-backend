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

// @desc    AI-powered dynamic pricing suggestions
// @route   POST /api/pricing/dynamic
// @access  Private
exports.getDynamicPricing = async (req, res) => {
    try {
        const { roomId } = req.body;

        if (!roomId) {
            return res.status(400).json({ message: "Room ID is required" });
        }

        // Fetch room details
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Fetch recent bookings for demand analysis
        const recentBookings = await Booking.find({
            room: roomId,
            createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }, // Last 30 days
        });

        // Fetch competitor room pricing (for simplicity, assuming similar room type in database)
        const competitorRooms = await Room.find({ type: room.type, _id: { $ne: roomId } });

        // Prepare data for AI pricing suggestion
        const competitorPricing = competitorRooms.map(r => ({ name: r.name, price: r.price }));
        const currentDemand = recentBookings.length;

        const prompt = `
            You are a hotel pricing AI expert. Suggest an optimal price for a room based on demand, competition, and seasonality.
            - Room Details: ${JSON.stringify(room)}
            - Recent Bookings (last 30 days): ${currentDemand}
            - Competitor Pricing: ${JSON.stringify(competitorPricing)}
            - Current Date: ${new Date().toISOString()}

            Provide a JSON response with the suggested price and justification.
        `;

        // Call OpenAI API
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
        });

        // Parse and return suggested price
        res.json(JSON.parse(response.data.choices[0].message.content.trim()));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
