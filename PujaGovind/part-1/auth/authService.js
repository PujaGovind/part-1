const bcrypt = require('bcrypt');
const db = require('../db'); // Assuming there's a db module for database interaction

const saltRounds = 10;

/**
 * Hashes a plain text password.
 * @param {string} password - The plain text password.
 * @returns {Promise<string>} - The hashed password.
 */
async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

/**
 * Verifies a plain text password against a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error verifying password');
    }
}

/**
 * Retrieves a user from the database by username.
 * @param {string} username - The username of the user.
 * @returns {Promise<object>} - The user object if found, null otherwise.
 */
async function getUserByUsername(username) {
    try {
        const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return user.rows[0] || null;
    } catch (error) {
        throw new Error('Error fetching user from database');
    }
}

/**
 * Creates a new user in the database.
 * @param {string} username - The username of the new user.
 * @param {string} password - The plain text password of the new user.
 * @returns {Promise<object>} - The created user object.
 */
async function createUser(username, password) {
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        return newUser.rows[0];
    } catch (error) {
        throw new Error('Error creating new user');
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    getUserByUsername,
    createUser
};

