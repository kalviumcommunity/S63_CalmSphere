const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js"); // Adjust path as needed

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "email"); // Fetch only emails
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
