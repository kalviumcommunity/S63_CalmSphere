import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createPost } from "../api";
import "./CreatePost.css";

function CreatePost() {
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get("email"); // Get email from URL params

  const [email, setEmail] = useState(userEmail || "");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Auto-fill email if it exists in the URL
  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!content.trim()) {
      setError("Content cannot be empty.");
      return;
    }

    const postData = { email, content, imageUrl, link };

    try {
      const data = await createPost(postData);
      if (data.error) {
        setError(data.error);
        return;
      }

      setSuccessMessage("Post created successfully!");
      setContent("");
      setImageUrl("");
      setLink("");
    } catch (error) {
      setError("Error creating post. Please try again.");
    }
  };

  return (
    <div className="create-post">
      <h2>Create a Post</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Email field (disabled if auto-filled from URL) */}
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={!!userEmail} // Disable input if email is pre-filled
        />

        {/* Content */}
        <textarea
          placeholder="How I bust my stress today..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* Image URL */}
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {/* External Link */}
        <input
          type="text"
          placeholder="External Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {/* Submit Button */}
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
