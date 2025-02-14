import React from "react";
import "./global.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <div className="content">
        <h1>Welcome to CalmSphere</h1>
        <p>Find your inner peace in the chaos of everyday life.</p>
        <button className="explore-btn">Explore Now</button>
      </div>
    </div>
  );
};

export default LandingPage;