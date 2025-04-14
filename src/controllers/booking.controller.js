const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const { sendBookingConfirmation } = require('../services/emailService');
const { generateCheckInQR } = require('../services/qrService');

exports.createBooking = async (req, res) => {
  try {
    const guestId = req.user.id;
    const { hotelId, checkInDate, checkOutDate, roomCount } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    // Optional: Add logic to check room availability here

    const booking = new Booking({
      hotel: hotelId,
      guest: guestId,
      checkInDate,
      checkOutDate,
      roomCount
    });

    await booking.save();

    hotel.bookings.push(booking._id);
    await hotel.save();

    const qr = await generateCheckInQR(booking._id);
    await sendBookingConfirmation(req.user.email, { hotel: hotel.name, checkInDate, qr });

    res.status(201).json({ message: 'Booking successful', booking, qr });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};

exports.checkIn = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.isCheckedIn = true;
    await booking.save();

    res.json({ message: 'Check-in successful' });
  } catch (err) {
    res.status(500).json({ message: 'Check-in failed', error: err.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.isCheckedOut = true;
    await booking.save();

    res.json({ message: 'Check-out successful' });
  } catch (err) {
    res.status(500).json({ message: 'Check-out failed', error: err.message });
  }
};

exports.getGuestBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user.id }).populate('hotel');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};
