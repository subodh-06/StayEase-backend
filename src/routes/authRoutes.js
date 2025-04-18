import express from 'express';
import { register, login,getMe } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe); // Add this line

export default router;