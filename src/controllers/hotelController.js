const Hotel = require("../models/Hotel");

// @desc    Register a new hotel (with image upload)
// @route   POST /api/hotels
// @access  Private (Only for hotel owners)
exports.registerHotel = async (req, res) => {
    try {
        const { name, location, description, facilities, pricePerNight } = req.body;

        if (!name || !location || !pricePerNight) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        let imageUrl = req.file ? req.file.path : "";  // Cloudinary already uploads the file

        const hotel = new Hotel({
            owner: req.user.id,
            name,
            location,
            description,
            facilities,
            pricePerNight,
            image: imageUrl, // Save image URL
        });

        await hotel.save();
        res.status(201).json({ message: "Hotel registered successfully", hotel });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc    Update hotel details (including image)
// @route   PUT /api/hotels/:hotelId
// @access  Private (Owner only)
exports.updateHotel = async (req, res) => {
    try {
        const { name, location, pricePerNight, description, facilities } = req.body;
        const hotelId = req.params.hotelId;
        const ownerId = req.user.id;

        let hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        if (hotel.owner.toString() !== ownerId) {
            return res.status(403).json({ message: "You can only update your own hotel" });
        }

        // If an image is uploaded, update the image URL
        if (req.file) {
            hotel.image = req.file.path;  // Use Cloudinary URL directly
        }

        // Update other fields if provided
        if (name) hotel.name = name;
        if (location) hotel.location = location;
        if (pricePerNight) hotel.pricePerNight = pricePerNight;
        if (description) hotel.description = description;
        if (facilities) hotel.facilities = facilities;

        await hotel.save();
        res.json({ message: "Hotel updated successfully", hotel });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
