import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [showSpeech, setShowSpeech] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="login-container">
      <h2>Login or Sign Up</h2>
      <p className="login-info">
        So that we can know you better and show you the content accordingly.
      </p>
      <div
        className="login-button-container"
        onMouseEnter={() => setShowSpeech(true)}
        onMouseLeave={() => setShowSpeech(false)}
      >
        <button className="login-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="signup-button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
