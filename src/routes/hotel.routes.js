const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createHotel, getMyHotels,searchHotels  } = require('../controllers/hotel.controller');

router.post('/', auth, createHotel);       // Create hotel (owner only)
router.get('/my-hotels', auth, getMyHotels); // Get hotels owned by current user
router.get('/search', searchHotels);

module.exports = router;
