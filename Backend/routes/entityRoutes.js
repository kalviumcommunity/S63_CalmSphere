const express = require("express");
const router = express.Router();
const {db} = require("../connectDB1"); // Import MySQL connection

// Create a new entity
router.post("/", async (req, res) => {
  const { name, description, created_by } = req.body;

  try {
    // Check if the user exists
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [created_by]);
    if (users.length === 0) {
      return res.status(400).json({ error: "User not found." });
    }

    // Insert the entity
    const [result] = await db.query(
      "INSERT INTO entities (name, description, created_by) VALUES (?, ?, ?)",
      [name, description, created_by]
    );

    res.status(201).json({
      message: "Entity created successfully!",
      entity: { id: result.insertId, name, description, created_by }
    });
  } catch (error) {
    console.error("❌ Error creating entity:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch entities by user
router.get("/by-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const [entities] = await db.query(
      "SELECT e.id, e.name, e.description, u.email FROM entities e JOIN users u ON e.created_by = u.id WHERE e.created_by = ?",
      [userId]
    );

    res.json(entities);
  } catch (error) {
    console.error("❌ Error fetching entities:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all users for dropdown
router.get("/users", async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, email FROM users");
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
