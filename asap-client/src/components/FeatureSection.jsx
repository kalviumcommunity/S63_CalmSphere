import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./FeatureSection.css";

const features = [
  {
    title: "Guided Meditation",
    description: "Personalized sessions to help you relax and regain focus.",
    icon: "🧘‍♀️",
  },
  {
    title: "Soothing Soundscapes",
    description: "Curated ambient sounds to reduce stress and enhance mindfulness.",
    icon: "🎵",
  },
  {
    title: "Mood Tracking",
    description: "Track and understand your emotions with our intuitive tool.",
    icon: "📊",
    link: "/mood-tracking", // Add link for navigation
  },
];

const FeatureSection = ({ scrollProgress }) => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <section
      className="feature-section"
      style={{
        opacity: scrollProgress, // Fade in effect
        transform: `translateY(${(1 - scrollProgress) * 50}px)`, // Moves up
      }}
    >
      <div className="feature-container-wrapper">
        <h2 className="feature-heading">Discover CalmSphere's Features</h2>
        <div className="feature-container">
          {features.map((feature, index) => (
            <div
              className="feature-card"
              key={index}
              onClick={() => feature.link && navigate(feature.link)} // Navigate if link exists
              style={{ cursor: feature.link ? "pointer" : "default" }} // Make Mood Tracking clickable
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
