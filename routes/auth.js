const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    // const users = await User.find().populate("tasks");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { phone_number, priority } = req.body;
    const user = await User.create({
      phone_number,
      priority,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ ...user._doc, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
