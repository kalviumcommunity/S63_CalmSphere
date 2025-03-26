const express = require("express");
const { db }  = require("../connectDB1"); // ✅ Ensure MySQL connection is imported

const router = express.Router();

// 📝 Create a new post
router.post("/create", async (req, res) => {
  try {
    const { email, content, imageUrl, link } = req.body;
    console.log("Received Data:", req.body); 

    // Check if the user exists in the database
    const [userExists] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (userExists.length === 0) {
      return res.status(400).json({ error: "No account found with this email." });
    }

    // Insert new post into MySQL
    await db.execute(
      "INSERT INTO posts (email, content, image_url, link, created_at) VALUES (?, ?, ?, ?, NOW())",
      [email, content, imageUrl, link]
    );

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// 📌 Fetch all posts
router.get("/all", async (req, res) => {
  try {
    const [posts] = await db.execute("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});




module.exports = router;
