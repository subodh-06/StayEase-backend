const Review = require("../models/Review");
const Hotel = require("../models/Hotel");

// @desc    Add a review for a hotel
// @route   POST /api/hotels/:hotelId/review
// @access  Private (Only authenticated users)
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const hotelId = req.params.hotelId;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5." });
        }

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }

        // Check if the user has already reviewed the hotel
        const existingReview = await Review.findOne({ user: req.user.id, hotel: hotelId });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this hotel." });
        }

        const review = new Review({
            user: req.user.id,
            hotel: hotelId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc    Get all reviews for a hotel
// @route   GET /api/hotels/:hotelId/reviews
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const reviews = await Review.find({ hotel: hotelId }).populate("user", "name");

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
