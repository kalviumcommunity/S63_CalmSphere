const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, db } = require("./connectDB1"); // ✅ Ensure correct import

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Load routes
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const moodRoutes = require("./routes/moodRoutes");
const postRoutes = require("./routes/postRoutes");
const entityRoutes = require("./routes/entityRoutes");

// ✅ Connect to MySQL
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to CalmSphere", dbStatus: "MySQL Connected" });
});

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT 1"); // Test query
    res.json({ message: "Database is working!", rows });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed!", details: error.message });
  }
});

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/mood-tracking", moodRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/entities", entityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
