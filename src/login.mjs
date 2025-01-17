export async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get email and password values from the form
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        // Send login request to the correct API endpoint
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }), // Send email and password in the request body
        });

        // Check if the response was not successful
        if (!response.ok) {
            const errorData = await response.json(); // Get the error message from the response
            console.error('Login error:', errorData);
            alert(errorData.errors[0].message || 'Error logging in. Please try again.'); // Display error message
            return;
        }

        // Parse the JSON response
        const data = await response.json();

        // Save the access token, username, and login state in localStorage
        localStorage.setItem('accessToken', data.data.accessToken); // Save the token
        localStorage.setItem('isLoggedIn', 'true'); // Indicate that the user is logged in
        localStorage.setItem('username', data.data.name); // Save the username for future use

        alert('Login successful'); // Notify the user of a successful login

        // Redirect to the listings page or another appropriate page
        window.location.href = 'listings.html';
    } catch (error) {
        // Catch and log any unexpected errors
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again.'); // Notify the user of an error
    }
}
