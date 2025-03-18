const express = require("express");
const { body, validationResult } = require("express-validator"); // Import express-validator
const bcrypt = require("bcryptjs"); // Use bcryptjs for password hashing
const User = require("../models/userModel");

const router = express.Router();

// Password validation regex: Ensures at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
const passwordValidation = body("password")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
  .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
  .matches(/\d/).withMessage("Password must contain at least one number")
  .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@, $, !, %, *, ?, &)");

// 🟢 SIGNUP ROUTE
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    passwordValidation, // Apply password validation
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the new user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  }
);

// 🟢 LOGIN ROUTE
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  }
);

// 🟢 GET ALL USERS (Excluding Passwords)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field for security
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

module.exports = router;
