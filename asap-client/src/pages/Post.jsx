import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api";
import "./Post.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const data = await getAllPosts();
      if (data.error) {
        setError(data.error);
      } else {
        setPosts(data);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <h2>All Posts</h2>
      {error && <p className="error-message">{error}</p>}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <p className="post-email">Created by: {post.email}</p>
              <p className="post-content">{post.content}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
              {post.link && (
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  View More
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
