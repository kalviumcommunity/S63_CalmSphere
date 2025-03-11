const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Keep date as a string (YYYY-MM-DD)
  mood: { type: String, required: true },
  notes: { type: String },
});

const Mood = mongoose.model("Mood", MoodSchema);
module.exports = Mood;
