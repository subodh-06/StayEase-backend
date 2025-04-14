const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createBooking,
  checkIn,
  checkOut,
  getGuestBookings
} = require('../controllers/booking.controller');

router.post('/', auth, createBooking);                // Create new booking
router.get('/my-bookings', auth, getGuestBookings);   // View guest's own bookings
router.post('/:id/check-in', auth, checkIn);          // Check-in using QR or link
router.post('/:id/check-out', auth, checkOut);        // Check-out

module.exports = router;
