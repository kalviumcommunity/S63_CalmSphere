const express = require("express");
const router = express.Router();
const {db} = require("../connectDB1"); // MySQL connection

// POST - Save a new contact message
router.post("/", (req, res) => {  
  console.log("📥 Received request:", req.body);

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("✅ Message saved:", result.insertId);
    res.status(201).json({ message: "Message sent!", id: result.insertId });
  });
});

// GET - Fetch all messages
router.get("/", (req, res) => {
  const sql = "SELECT * FROM contacts";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ SQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
