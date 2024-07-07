// PujaGovind/part-1/auth/session.js

const session = require('express-session');

// Initialize session middleware
const sessionMiddleware = session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
});

// Function to create a session
function createSession(req, user) {
    req.session.userId = user.id;
    req.session.username = user.username;
}

// Function to validate a session
function validateSession(req) {
    return req.session && req.session.userId;
}

// Function to destroy a session
function destroySession(req) {
    return new Promise((resolve, reject) => {
        req.session.destroy(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

module.exports = {
    sessionMiddleware,
    createSession,
    validateSession,
    destroySession
};

