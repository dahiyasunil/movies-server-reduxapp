const mongoose = require("mongoose");
require("dotenv").config();

const mongodb_url = process.env.MONGODB_URL;

const initialiseDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongodb_url);
    if (connection) {
      console.log("Connected to Database!");
    }
  } catch (error) {
    console.log("Failed to connect to Database! Error: ", error);
  }
};

module.exports = { initialiseDatabase };
