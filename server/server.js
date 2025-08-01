const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/collegeTaskManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// User Model
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  teamName: String,
}));

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, teamName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password, role, teamName });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error); // 👈 Check here for errors in terminal
    res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
