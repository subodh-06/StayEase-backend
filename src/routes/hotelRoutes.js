import express from 'express';
import {
  addHotel,
  getHotelById,
  searchHotels,
  getOwnerHotels
} from '../controllers/hotelController.js';

import { authenticate, isOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/search', searchHotels); // ?query=city_or_name
router.get('/:id', getHotelById);

// Owner routes
router.post('/add', authenticate, isOwner, addHotel);
router.get('/my-hotels', authenticate, isOwner, getOwnerHotels);

export default router;
