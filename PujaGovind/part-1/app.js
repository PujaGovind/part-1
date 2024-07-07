const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./auth/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Serve static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, 'auth')));

// Routes
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'auth', 'login.html'));
});

app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

