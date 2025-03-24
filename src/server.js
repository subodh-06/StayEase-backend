const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const sentimentRoutes = require("./routes/sentimentRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/sentiment", sentimentRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/pricing", pricingRoutes);

app.use("/api/hotels", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));