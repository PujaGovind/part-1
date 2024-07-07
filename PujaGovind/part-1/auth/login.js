document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        errorMessage.textContent = '';

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!validateForm(username, password)) {
            errorMessage.textContent = 'Please fill in both fields.';
            return;
        }

        const loginData = {
            username: username,
            password: password
        };

        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard';
            } else {
                errorMessage.textContent = data.message || 'Login failed. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        });
    });

    function validateForm(username, password) {
        return username !== '' && password !== '';
    }
});

