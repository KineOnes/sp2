console.log('Auth script loaded'); // Debugging: Check if the script is running

const authButton = document.getElementById('authButton');

// Function to check login state and update the button
function updateAuthButton() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        authButton.textContent = 'Logout'; // Change button to Logout
        authButton.onclick = handleLogout; // Ensure Logout functionality is added
    } else {
        authButton.textContent = 'Register/Login'; // Default text
        authButton.onclick = handleLogin; // Ensure Login/Register functionality is added
    }
}

// Handle login (redirect to login page)
function handleLogin() {
    window.location.href = 'login.html';
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn'); // Clear login flag
    localStorage.removeItem('accessToken'); // Clear token
    localStorage.removeItem('username'); // Clear username
    alert('You have been logged out.');
    window.location.href = 'index.html'; // Redirect to the homepage or login page
}

// Automatically call updateAuthButton when the script is loaded
if (authButton) {
    updateAuthButton();
}
