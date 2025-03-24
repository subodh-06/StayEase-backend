const express = require("express");
const { getRoomRecommendations } = require("../controllers/recommendationController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// AI Room Recommendation Endpoint
router.post("/rooms", verifyToken, getRoomRecommendations);

module.exports = router;
