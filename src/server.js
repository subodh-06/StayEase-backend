const app = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this based on where your frontend is running
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));
