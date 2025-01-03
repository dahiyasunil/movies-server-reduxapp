const express = require("express");
const cors = require("cors");
const app = express();

const { initialiseDatabase } = require("./db/db.connection");
const { MoviesDB } = require("./models/movie.model");

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());

initialiseDatabase();

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await MoviesDB.find();
    res.status(200).json(allMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies", async (req, res) => {
  try {
    const newMovie = new MoviesDB(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/movies/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const updatedMovie = await MoviesDB.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/movies/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const deletedMovie = await MoviesDB.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(deletedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is up and running!", PORT);
});
