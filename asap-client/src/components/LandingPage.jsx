import React from "react";
import "./global.css";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ scrollProgress }) => {
  const navigate = useNavigate();
  return (
    <section
      className="landing-container"
      style={{
        opacity: 1 - scrollProgress, // Fade out effect
        transform: `translateY(${scrollProgress * -50}px)`, // Moves up
      }}
    >
      <div className="content">
        <h1>Welcome to CalmSphere</h1>
        <p>Find your inner peace in the chaos of everyday life.</p>
        <button className="explore-btn"  onClick={() => navigate("/login")} >Explore Now</button>
      </div>
    </section>
  );
};

export default LandingPage;
