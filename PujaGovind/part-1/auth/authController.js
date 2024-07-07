const authService = require('./authService');
const session = require('./session');

// Function to process login requests
async function login(req, res) {
    const { username, password } = req.body;

    // Validate user credentials
    const user = await authService.validateUserCredentials(username, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create user session
    session.create(req, user);

    // Respond with success message
    res.status(200).json({ message: 'Login successful', user });
}

// Function to handle user logout
function logout(req, res) {
    session.destroy(req);
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
    login,
    logout
};

