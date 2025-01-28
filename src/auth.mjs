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
    localStorage.removeItem('authToken'); // Clear token
    localStorage.removeItem('profileName'); // Clear username/profile name
    localStorage.removeItem('avatar'); // Clear avatar URL (optional, user-specific)
    alert('You have been logged out.');
    window.location.href = 'index.html'; // Redirect to the homepage or login page
}

// Automatically call updateAuthButton when the script is loaded
if (authButton) {
    updateAuthButton();
}

// Utility function to get stored user information
export function getUserInfo() {
    return {
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
        username: localStorage.getItem('profileName') || 'Guest',
        avatar: localStorage.getItem('avatar') || 'https://via.placeholder.com/150', // Default avatar
    };
}

// Utility function to save user avatar to localStorage (can be used in profile.mjs)
export function saveUserAvatar(newAvatarUrl) {
    localStorage.setItem('avatar', newAvatarUrl);
}

// Function to retrieve the authentication token
export function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Function to retrieve the profile name of the logged-in user
export function getProfileName() {
    return localStorage.getItem('profileName');
}
