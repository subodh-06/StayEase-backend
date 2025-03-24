const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Single", "Double", "Suite"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Room", RoomSchema);
