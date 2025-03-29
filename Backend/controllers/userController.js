const { db } = require("../connectDB1"); // ✅ Import correctly
const bcrypt = require("bcryptjs");
// CREATE - Add a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔒 Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [name, email, hashedPassword]);

    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error creating user", details: err.message });
  }
};
// READ - Get all users
exports.getUsers = async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, name, email FROM users"); // ✅ Use await
    res.json(results);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users", details: err.message });
  }
};

// UPDATE - Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    await db.query(sql, [name, email, password, id]); // ✅ Use await
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Error updating user", details: err.message });
  }
};

// DELETE - Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = ?", [id]); // ✅ Use await
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Error deleting user", details: err.message });
  }
};
