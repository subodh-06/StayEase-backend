import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";

// GET /api/owner/:id/stats
export const getOwnerStats = async (req, res) => {
  const ownerId = req.params.id;

  try {
    // Get hotels owned by this owner
    const hotels = await Hotel.find({ owner: ownerId });

    const hotelIds = hotels.map((hotel) => hotel._id);

    // Get bookings for these hotels
    const bookings = await Booking.find({ hotel: { $in: hotelIds } });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.totalAmount || 0),
      0
    );

    res.json({
      totalHotels: hotels.length,
      totalBookings,
      totalRevenue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
