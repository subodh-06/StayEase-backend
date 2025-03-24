const express = require("express");
const { getDynamicPricing } = require("../controllers/pricingController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// AI Dynamic Pricing Endpoint
router.post("/dynamic", verifyToken, getDynamicPricing);

module.exports = router;
