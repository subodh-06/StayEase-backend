const express = require("express");
const { suggestRoomAllocation } = require("../controllers/roomAllocationController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// AI Room Allocation Endpoint
router.post("/allocate", verifyToken, suggestRoomAllocation);

module.exports = router;
