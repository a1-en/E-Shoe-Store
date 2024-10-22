require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(cors()); // Use CORS middleware
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Middleware to verify JWT
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized, token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token or token expired" });
    }
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
};

// Signup route
app.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Input validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(400).json({ message: "Username already taken" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        next(err); // Pass to error handler
    }
});

// Login route
app.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        next(err); // Pass to error handler
    }
});

// Protected route example
app.get('/protected', auth, (req, res) => {
    res.send("This is a protected route");
});

// Catch 404 for non-existent routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
