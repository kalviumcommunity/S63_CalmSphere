import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import FeatureSection from "./components/FeatureSection";
import LoginPage from "./pages/LoginPage";
import "./components/global.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import Posts from "./pages/Post";

import ContactUs from "./pages/ContactUs";
import MoodTracking from "./pages/MoodTracking";
import EntitiesList from "./components/EntitiesList";

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollPercent = Math.min(scrollY / viewportHeight, 1); // Cap at 1

      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="full-page-container">
              <LandingPage scrollProgress={scrollProgress} />
              <FeatureSection scrollProgress={scrollProgress} />
            </div>
          } 
        />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/mood-tracking" element={<MoodTracking />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/entities" element={<EntitiesList />} /> 
      </Routes>
    </Router>
  );
};

export default App;
