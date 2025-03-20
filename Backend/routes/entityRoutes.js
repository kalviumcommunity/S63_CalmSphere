const express = require("express");
const router = express.Router();
const Entity = require("../models/entityModel");
const User = require("../models/userModel");

// Create a new entity
router.post("/", async (req, res) => {
  const { name, description, created_by } = req.body;

  try {
    // Check if the user exists
    const userExists = await User.findById(created_by);
    if (!userExists) {
      return res.status(400).json({ error: "User not found." });
    }

    // Create the entity
    const newEntity = new Entity({ name, description, created_by });
    await newEntity.save();

    res.status(201).json({ message: "Entity created successfully!", entity: newEntity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch entities by user
router.get("/by-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const entities = await Entity.find({ created_by: userId }).populate("created_by", "email");
    res.json(entities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all users for dropdown
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "email _id");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
