const Room = require("../models/Room");
const Booking = require("../models/Booking");

// @desc    Book a room
// @route   POST /api/rooms/book
// @access  Private (User only)
exports.bookRoom = async (req, res) => {
    try {
        const { roomId, checkInDate, checkOutDate } = req.body;

        if (!roomId || !checkInDate || !checkOutDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const room = await Room.findById(roomId);
        if (!room || room.isBooked) {
            return res.status(400).json({ message: "Room not available" });
        }

        const days = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
        const totalAmount = days * room.price;

        const booking = new Booking({
            user: req.user.id,
            room: roomId,
            hotel: room.hotel,
            checkInDate,
            checkOutDate,
            totalAmount,
        });

        await booking.save();

        room.isBooked = true;
        await room.save();

        res.status(201).json({ message: "Room booked successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private (User only)
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate("room").populate("hotel");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
