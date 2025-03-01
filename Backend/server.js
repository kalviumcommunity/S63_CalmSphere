const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
const connectDB = require('./connectDB');
const contactRoutes = require("./routes/contactRoutes");

const entityRoutes = require('./routes/entityRoutes');  // Ensure this exists!
const userRoutes = require('./routes/userRoutes');  // Ensure this exists!
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

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
// app.use('/api/entities', entityRoutes);  // <-- This must be correct
// app.use('/api/users', userRoutes);

app.use('/api', userRoutes);
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
