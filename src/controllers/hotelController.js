import Hotel from '../models/Hotel.js';

// @desc    List a hotel (owner only)
export const addHotel = async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      amenities,
      images,
      pricePerDay
    } = req.body;

    const newHotel = await Hotel.create({
      owner: req.user._id,
      name,
      city,
      address,
      amenities,
      images,
      pricePerDay
    });

    res.status(201).json({ message: 'Hotel listed successfully', hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add hotel', error });
  }
};

// @desc    Get hotel by ID (for public viewing)
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('owner', 'name email');
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hotel', error });
  }
};

// @desc    Search hotels by city or name (public)
export const searchHotels = async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, 'i');

    const hotels = await Hotel.find({
      $or: [{ city: regex }, { name: regex }]
    });

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search hotels', error });
  }
};

// @desc    Get hotels listed by the logged-in owner
export const getOwnerHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.user._id });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your hotels', error });
  }
};
