const express = require('express');
const connectDB = require('./connectDB'); // Import connectDB function
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB(); 

// Routes
app.get('/ping', (req, res) => {
  res.send('Pong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
