import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-3xl text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to CalmSphere</h1>
        <p className="text-lg mb-6 opacity-80">
          Your go-to platform for relaxation, mindfulness, and mental well-being.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:scale-105 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
