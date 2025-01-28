import { API_BASE_URL } from './config.mjs'; // Import API base URL
import { getAuthToken, getProfileName } from './auth.mjs'; // Import helper functions

const apiKey = '93e47466-52cc-4e67-bf58-91bf2d198526';

// Utility function to fetch user data
export async function getUserData() {
  // Retrieve the profile name and authentication token
  const profileName = getProfileName();
  const token = getAuthToken();

  // Check if the token or profile name is missing
  if (!profileName)  {
    throw new Error('User not logged in.');
  }

  if (!token) {
    throw new Error('Session expired.');
  }

  try {
    // Make the API request
    const response = await fetch(`${API_BASE_URL}/auction/profiles/${profileName}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the authentication token
        "X-Noroff-API-Key": apiKey
      },
    });

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    // Parse the response and return the user data
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error; // Re-throw the error for handling in calling code
  }
}
