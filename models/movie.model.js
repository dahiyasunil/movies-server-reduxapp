const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  releaseYear: { type: Number, required: true },
  genre: [String],
  directors: {
    type: [String],
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  languages: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  plot: String,
  posterUrl: String,
});

const MoviesDB = mongoose.model("MoviesDB", movieSchema);

module.exports = { MoviesDB };
