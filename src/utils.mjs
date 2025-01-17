// Utility function to fetch user data
export async function getUserData() {
    // Retrieve the access token and username from localStorage
    const token = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
  
    // Your API Key (replace with the one you generated)
    const apiKey = '93e47466-52cc-4e67-bf58-91bf2d198526';
  
    // Check if the access token or username is missing
    if (!token || !username) {
      throw new Error('Missing access token or username. Please log in again.');
    }
  
    try {
      // Make the API request
      const response = await fetch(`https://v2.api.noroff.dev/auction/profiles/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the access token
          'X-Noroff-API-Key': apiKey,      // Include the API key
        },
      });
  
      // Check for a successful response
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response for debugging
        console.error('Error from API:', errorData);
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
  
      // Parse the response and return the user data
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error; // Re-throw the error for handling in calling code
    }
  }
  