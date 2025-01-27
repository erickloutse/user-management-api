// routes/userRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// @route GET /api/users
// @desc Get all users with pagination
// @access Private (Admin)
router.get("/", protect, admin, async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 10; // Number of users per page

  try {
    const count = await User.countDocuments({});
    const users = await User.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      users,
      page,
      pages: Math.ceil(count / pageSize),
    });
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
