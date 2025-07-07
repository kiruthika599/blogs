const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      username: user.username
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: "✅ Registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, message: "❌ Server error" });
  }
});

module.exports = router;
