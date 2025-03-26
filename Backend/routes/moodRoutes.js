const express = require("express");
const router = express.Router();
const { db } = require("../connectDB1"); // Import MySQL connection

// CREATE - Save a new mood entry
router.post("/", (req, res) => {
  console.log("📥 Received POST request:", req.body); // ✅ Debug log

  const { date, mood, notes } = req.body;
  const sql = "INSERT INTO moods (date, mood, notes) VALUES (?, ?, ?)";

  if (!date || !mood) {
    console.error("❌ Missing required fields");
    return res.status(400).json({ error: "Date and mood are required." });
  }

  db.query(sql, [date, mood, notes], (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);
      return res.status(500).json({ error: "Failed to save mood" });
    }

    console.log("✅ Mood saved:", result.insertId);
    res.status(201).json({ id: result.insertId, date, mood, notes });
  });
});

// READ - Fetch moods for a specific date
router.get("/:date", (req, res) => {
  const { date } = req.params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }

  const sql = "SELECT * FROM moods WHERE date = ?";
  db.query(sql, [date], (err, results) => {
    if (err) {
      console.error("Error fetching moods:", err);
      return res.status(500).json({ error: "Failed to fetch moods" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No moods found for this date." });
    }
    res.json(results);
  });
});

// UPDATE - Update a mood entry
router.put("/:id", (req, res) => {
    const { date, mood, notes } = req.body;
    const sql = "UPDATE moods SET date = ?, mood = ?, notes = ? WHERE id = ?";

    db.query(sql, [date, mood, notes, req.params.id], (err, result) => {
        if (err) {
            console.error("Error updating mood:", err);
            return res.status(500).json({ error: "Failed to update mood" });
        }
        res.json({ message: "Mood updated successfully" });
    });
});

// DELETE - Delete a mood entry
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM moods WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting mood:", err);
            return res.status(500).json({ error: "Failed to delete mood" });
        }
        res.json({ message: "Mood deleted successfully" });
    });
});

router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});


module.exports = router;
