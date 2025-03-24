const express = require("express");
const { addReview, getReviews } = require("../controllers/reviewController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Add a review (Only authenticated users)
router.post("/:hotelId/review", verifyToken, addReview);

// Get all reviews for a hotel (Public)
router.get("/:hotelId/reviews", getReviews);

module.exports = router;
