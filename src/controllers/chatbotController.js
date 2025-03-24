const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Configure OpenAI
const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

// @desc    AI Chatbot for customer support
// @route   POST /api/chatbot/chat
// @access  Private
exports.chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: "Please provide a message." });
        }

        // Prepare prompt for OpenAI
        const prompt = `You are an AI chatbot for StayEase, a hotel booking platform. Answer user queries professionally and helpfully. User asks: "${message}"`;

        // Call OpenAI API
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
        });

        // Return AI response
        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
