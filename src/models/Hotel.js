import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  city: String,
  address: String,
  amenities: {
    ac: Boolean,
    wifi: Boolean,
    tv: Boolean,
    geyser: Boolean,
    powerBackup: Boolean
  },
  images: [String],
  pricePerDay: Number
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);