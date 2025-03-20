const express = require("express");
const Post = require("../models/Posts");
const User = require("../models/userModel"); // Ensure user exists before creating a post

const router = express.Router();

// 📝 Create a new post
router.post("/create", async (req, res) => {
  try {
    const { email, content, imageUrl, link } = req.body;

    // Check if the user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ error: "No account found with this email." });
    }

    // Create and save post
    const newPost = new Post({ email, content, imageUrl, link });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// 📌 Fetch all posts
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

module.exports = router;
