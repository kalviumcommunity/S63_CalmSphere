import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css"; // Ensure this file exists

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Stores success or error message
  const [isSuccess, setIsSuccess] = useState(false); // Tracks success state

  // Function to validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Client-side validations
    if (!name || !email || !password) {
      setMessage("All fields are required!");
      setIsSuccess(false);
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("🎉 Signup successful! You can now log in.");
        setIsSuccess(true);

        // Clear form fields
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
      {/* Success/Error Message */}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
