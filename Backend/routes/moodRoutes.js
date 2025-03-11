const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

// Save a new mood entry
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
    try {
      const { date, mood, notes } = req.body;
  
      const newMood = new Mood({ date, mood, notes });
      await newMood.save();
  
      res.status(201).json(newMood);
    } catch (err) {
      console.error("Error saving mood:", err);
      res.status(500).json({ error: "Failed to save mood" });
    }
  });
  
  

// Fetch moods for a specific date
router.get("/:date", async (req, res) => {
    try {
      console.log("Received request for date:", req.params.date);
  
      const moods = await Mood.find({ date: req.params.date });
  
      if (!moods.length) {
        return res.status(404).json({ message: "No moods found for this date." });
      }
  
      console.log("Moods found:", moods);
      res.json(moods);
    } catch (err) {
      console.error("Failed to fetch moods:", err);
      res.status(500).json({ error: "Failed to fetch moods" });
    }
  });
  

// Update a mood entry
router.put("/:id", async (req, res) => {
  try {
    const updatedMood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMood);
  } catch (err) {
    res.status(500).json({ error: "Failed to update mood" });
  }
});

// Delete a mood entry
router.delete("/:id", async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.json({ message: "Mood deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete mood" });
  }
});

module.exports = router;
