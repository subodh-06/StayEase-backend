import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';

// @desc   Book a room (User only)
export const createBooking = async (req, res) => {
  try {
    const {
      hotelId,
      checkIn,
      checkOut,
      rooms,
      people,
      guestName,
      guestPhone
    } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const newBooking = await Booking.create({
      user: req.user._id,
      hotel: hotelId,
      checkIn,
      checkOut,
      rooms,
      people,
      guestName,
      guestPhone,
      isPaid: false // You can toggle this based on payment logic
    });

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error });
  }
};

// @desc   Get current user bookings (past + current)
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('hotel');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get bookings', error });
  }
};

// @desc   Hotel Owner: Get dashboard data for their hotels
export const getOwnerDashboard = async (req, res) => {
  try {
    // Step 1: Get hotels owned by this user
    const hotels = await Hotel.find({ owner: req.user._id }).select('_id name');
    const hotelIds = hotels.map(h => h._id);

    // Step 2: Find bookings for those hotels
    const bookings = await Booking.find({ hotel: { $in: hotelIds } })
      .populate('hotel', 'name')
      .populate('user', 'name');

    res.json({
      totalHotels: hotels.length,
      totalBookings: bookings.length,
      bookings: bookings.map(b => ({
        hotelName: b.hotel.name,
        guestName: b.guestName,
        guestPhone: b.guestPhone,
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        rooms: b.rooms,
        people: b.people,
        createdAt: b.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load dashboard', error });
  }
};
