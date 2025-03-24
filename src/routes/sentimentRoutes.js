const express = require("express");
const { analyzeSentiment } = require("../controllers/sentimentController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// AI Sentiment Analysis Endpoint
router.post("/analyze", verifyToken, analyzeSentiment);

module.exports = router;
