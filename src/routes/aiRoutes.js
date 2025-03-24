const express = require("express");
const { getRoomRecommendations } = require("../controllers/aiController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get AI-powered room recommendations
router.get("/recommendations", verifyToken, getRoomRecommendations);

module.exports = router;
