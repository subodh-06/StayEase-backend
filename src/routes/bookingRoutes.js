import express from 'express';
import {
  createBooking,
  getUserBookings,
  getOwnerDashboard
} from '../controllers/bookingController.js';

import { authenticate, isOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// User
router.post('/', authenticate, createBooking);
router.get('/my-bookings', authenticate, getUserBookings);

// Hotel Owner
router.get('/owner-dashboard', authenticate, isOwner, getOwnerDashboard);

export default router;
