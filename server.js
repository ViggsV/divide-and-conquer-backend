const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

<<<<<<< HEAD
// Routes
const adRoutes = require('./routes/adRoutes');
const authRoutes = require('./routes/authRoutes');
=======
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
>>>>>>> 23909bcddfe4d83ec6062aba98606e548f1b1dbd

app.use('/chores', choreRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});