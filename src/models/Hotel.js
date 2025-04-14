const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  photos: [String],
  rooms: Number,
  facilities: [String],
  location: String,
  gmbLink: String,
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  rooms: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);
