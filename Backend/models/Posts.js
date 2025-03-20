const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  link: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
