const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
const connectDB = require('./connectDB');
const contactRoutes = require("./routes/contactRoutes");
const moodRoutes = require("./routes/moodRoutes");

const entityRoutes = require('./routes/entityRoutes');  
const userRoutes = require('./routes/userRoutes'); 
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


connectDB();


app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected';
  res.json({ message: 'Welcome to CalmSphere', dbStatus });
});


app.get('/ping', (req, res) => {
  res.send('Pong!');
});



app.use('/api', userRoutes);
app.use("/api", contactRoutes);
app.use("/api/mood-tracking", moodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
