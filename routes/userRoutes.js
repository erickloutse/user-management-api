// routes/userRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// @route GET /api/users
// @desc Get all users (Admin only)
// @access Private (Admin)
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/users/profile
// @desc Get user profile
// @access Private
router.get("/profile", protect, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
