const express = require("express");
const { chatWithAI } = require("../controllers/chatbotController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// AI Chatbot Endpoint
router.post("/chat", verifyToken, chatWithAI);

module.exports = router;
