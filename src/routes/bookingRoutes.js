const express = require("express");
const { bookRoom, getUserBookings } = require("../controllers/bookingController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Book a room
router.post("/book", verifyToken, bookRoom);

// Get user bookings
router.get("/", verifyToken, getUserBookings);

module.exports = router;
