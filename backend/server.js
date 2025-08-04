require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./Movies/MovieRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {dbName: 'MovieWebsite_ITI'})
.then(() => {
  console.log('📱☎️Connected to MongoDB');
  console.log('📍 Database:', MONGODB_URI);
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/movies', movieRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie API Server is running!',
    endpoints: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});