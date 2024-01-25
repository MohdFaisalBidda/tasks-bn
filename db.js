// require("dotenv").config()
const { config } = require("dotenv");
const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGO_URI);

db ? console.log("Connected to DB") : console.log("Error connecting to DB");

module.exports = db;
