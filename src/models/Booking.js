const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkInDate: Date,
  checkOutDate: Date,
  roomCount: Number,
  isCheckedIn: { type: Boolean, default: false },
  isCheckedOut: { type: Boolean, default: false },
});

module.exports = mongoose.model('Booking', bookingSchema);
