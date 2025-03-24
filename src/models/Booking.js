const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Booked", "Checked-In", "Checked-Out", "Cancelled"],
        default: "Booked",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Booking", BookingSchema);
