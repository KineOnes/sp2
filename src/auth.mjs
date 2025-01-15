console.log('Auth script loaded'); // Debugging: Check if the script is running

const authButton = document.getElementById('authButton');

// Function to check login state and update the button
function updateAuthButton() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        authButton.textContent = 'Logout'; // Change button to Logout
        authButton.addEventListener('click', handleLogout);
    } else {
        authButton.textContent = 'Register/Login'; // Default text
        authButton.addEventListener('click', handleLogin);
    }
}

// Handle login (redirect to login page)
function handleLogin() {
    window.location.href = 'login.html';
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn'); // Clear login flag
    alert('You have been logged out.');
    updateAuthButton(); // Refresh the button state
}

// Initialize button state when the page loads
if (authButton) {
    updateAuthButton();
}
