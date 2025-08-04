const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    default: false
  },
  backdrop_path: {
    type: String
  },
  genre_ids: [{
    type: Number
  }],
  original_language: {
    type: String,
    required: true
  },
  original_title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  popularity: {
    type: Number,
    default: 0
  },
  poster_path: {
    type: String
  },
  release_date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  video: {
    type: Boolean,
    default: false
  },
  vote_average: {
    type: Number,
    default: 0
  },
  vote_count: {
    type: Number,
    default: 0
  },
  is_favorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;