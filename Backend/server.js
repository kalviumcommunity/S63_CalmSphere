const express = require('express');
const connectDB = require('./connectDB'); 
const mongoose = require('mongoose');

const entityRoutes = require('./routes/entityRoutes');  // Ensure this exists!
const userRoutes = require('./routes/userRoutes');  // Ensure this exists!

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

// ✅ Use CRUD routes (Make sure the file paths are correct)
app.use('/api/entities', entityRoutes);  // <-- This must be correct
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
