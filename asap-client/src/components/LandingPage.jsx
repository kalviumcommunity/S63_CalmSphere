import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./global.css";

const LandingPage = ({ scrollProgress }) => {
  const navigate = useNavigate();

  return (
    <section
      className="landing-container"
      style={{
        opacity: 1 - scrollProgress,
        transform: `translateY(${scrollProgress * -50}px)`,
      }}
    >
      <div className="content">
        <h1>Welcome to CalmSphere</h1>
        <p>Find your inner peace in the chaos of everyday life.</p>
        <button className="explore-btn" onClick={() => navigate("/login")}>
          Explore Now
        </button>
        <Link to="/contact">
          <button className="contact-btn">Contact Us</button>
        </Link>
        <Link to="/entities">
          <button className="entities-btn">View Entities</button>
        </Link>
        <button className="view-posts-btn" onClick={() => navigate("/posts")}>View Posts</button>
      </div>
    </section>
  );
};

export default LandingPage;
