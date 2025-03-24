const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Configure OpenAI
const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

// @desc    Analyze sentiment of a guest review
// @route   POST /api/sentiment/analyze
// @access  Private
exports.analyzeSentiment = async (req, res) => {
    try {
        const { review } = req.body;
        if (!review) {
            return res.status(400).json({ message: "Please provide a review." });
        }

        // Prepare prompt for OpenAI
        const prompt = `Analyze the sentiment of the following hotel guest review and classify it as Positive, Neutral, or Negative. Review: "${review}"`;

        // Call OpenAI API
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
        });

        // Return AI sentiment analysis result
        res.json({ sentiment: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
