const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "StayEase",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer upload middleware
const upload = multer({ storage });

module.exports = upload;
