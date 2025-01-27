// routes/userRoutes.js
const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// @route POST /api/users
// @desc Create a new user (Admin only)
// @access Private (Admin)
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Return user data with JWT token
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/users/:id
// @desc Get a specific user by ID
// @access Private (Admin or user)
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Admin can access all user data, but user can only access their own data
    if (req.user.role === "admin" || req.user.id === user.id) {
      res.status(200).json(user);
    } else {
      res.status(403).json({ message: "Not authorized to access this user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/users/:id
// @desc Update a user's information
// @access Private (Admin or user)
router.put("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Admin can update any user, but user can only update their own data
    if (req.user.role === "admin" || req.user.id === user.id) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();

      res.status(200).json(updatedUser);
    } else {
      res.status(403).json({ message: "Not authorized to update this user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/users/:id
// @desc Delete a user (Admin only)
// @access Private (Admin)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.remove();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
