import React from "react";
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
  },
];

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <h2 className="feature-heading">Discover CalmSphere's Features</h2>
      <div className="feature-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
