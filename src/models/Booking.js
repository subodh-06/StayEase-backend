import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  checkIn: Date,
  checkOut: Date,
  rooms: Number,
  people: Number,
  guestName: String,
  guestPhone: String
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);