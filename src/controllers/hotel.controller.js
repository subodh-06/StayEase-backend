const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

exports.createHotel = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const {
      name,
      photos,
      rooms,
      facilities,
      location,
      gmbLink
    } = req.body;

    const hotel = new Hotel({
      owner: ownerId,
      name,
      photos,
      rooms,
      facilities,
      location,
      gmbLink
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Hotel creation failed', error: err.message });
  }
};

exports.getMyHotels = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const hotels = await Hotel.find({ owner: ownerId }).populate('bookings');
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve hotels', error: err.message });
  }
};



exports.searchHotels = async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests, rooms } = req.query;

    if (!location || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'Please provide all required filters.' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Step 1: Find hotels matching location or name
    const hotels = await Hotel.find({
      $or: [
        { name: { $regex: location, $options: 'i' } },
        { location: { $regex: location, $options: 'i' } }
      ]
    });

    // Step 2: Filter by room availability
    const availableHotels = [];

    for (const hotel of hotels) {
      const overlappingBookings = await Booking.find({
        hotel: hotel._id,
        $or: [
          {
            checkIn: { $lt: checkOutDate },
            checkOut: { $gt: checkInDate }
          }
        ]
      });

      const bookedRooms = overlappingBookings.length;
      const availableRooms = hotel.rooms - bookedRooms;

      if (availableRooms >= parseInt(rooms || 1)) {
        availableHotels.push({
          hotel,
          availableRooms
        });
      }
    }

    res.json(availableHotels);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

