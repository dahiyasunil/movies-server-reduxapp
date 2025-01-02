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
