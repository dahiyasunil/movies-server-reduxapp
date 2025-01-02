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
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies", async (req, res) => {
  try {
    const newMovie = new MoviesDB(req.body);
    await newMovie.save();
    res.status(201).json(bookData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is up and running!");
});
