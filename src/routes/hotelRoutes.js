const express = require("express");
const { registerHotel, getHotels, updateHotel } = require("../controllers/hotelController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Register hotel (with image upload)
router.post("/", verifyToken, upload.single("image"), registerHotel);

// Get all hotels
router.get("/", getHotels);

// Update hotel details (including image)
router.put("/:hotelId", verifyToken, upload.single("image"), updateHotel);

module.exports = router;
