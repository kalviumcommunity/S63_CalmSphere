import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css"; // Ensure this file exists in the same folder

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Stores success or error message
  const [isSuccess, setIsSuccess] = useState(false); // Tracks success state

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("🎉 Signup successful! You can now log in.");
        setIsSuccess(true); // Show success message

        // Clear the form
        setName("");
        setEmail("");
        setPassword("");

        // Hide the success message after 3 seconds
        setTimeout(() => {
          setMessage("");
          setIsSuccess(false);
        }, 3000);
      } else {
        setMessage(data.message || "Signup failed. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Error connecting to server. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Success Message at the Top */}
      {message && (
        <div className={`message-box ${isSuccess ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="signup-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
