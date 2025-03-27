const { db } = require("../connectDB1");
const jwt = require("jsonwebtoken");

// 🛑 Secret Key for JWT (store in .env for security)
const SECRET_KEY = "your_secret_key"; 

// ✅ **Login Controller**
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check if the user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ email: users[0].email }, SECRET_KEY, { expiresIn: "1h" });

    // 🍪 Set token in HTTP-Only Cookie
    res.cookie("auth_token", token, { httpOnly: true, secure: false });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Error logging in", details: err.message });
  }
};

// ✅ **Logout Controller**
exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("auth_token"); // 🍪 Remove the auth token
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error logging out:", err);
    res.status(500).json({ error: "Error logging out", details: err.message });
  }
};
