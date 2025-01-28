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

        // Log the entire API response for debugging
        console.log('API Response:', data);

        // Check if the expected fields are present
        if (!data.data || !data.data.accessToken || !data.data.name) {
            throw new Error('Invalid API response: Missing accessToken or name');
        }

        // Save the access token, username, and login state in localStorage
        localStorage.setItem('accessToken', data.data.accessToken); // Save the token
        console.log('Token saved in localStorage:', data.data.accessToken); // Log token

        localStorage.setItem('isLoggedIn', 'true'); // Indicate that the user is logged in
        console.log('Login state saved in localStorage: true'); // Log login state

        localStorage.setItem('username', data.data.name); // Save the username for future use
        console.log('Username saved in localStorage:', data.data.name); // Log username

        alert('Login successful'); // Notify the user of a successful login

        // Redirect to the listings page or another appropriate page
        window.location.href = 'listings.html';
    } catch (error) {
        // Catch and log any unexpected errors
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again.'); // Notify the user of an error
    }
}
