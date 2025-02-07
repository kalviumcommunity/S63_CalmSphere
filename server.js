const express = require('express');
const connectDB = require('./connectDB'); // Import the MongoDB connection function
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Home route displaying database connection status
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected';
  res.json({ message: 'Welcome to CalmSphere', dbStatus });
});

// Ping route
app.get('/ping', (req, res) => {
  res.send('Pong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
