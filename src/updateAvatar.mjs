import { API_BASE_URL } from './config.mjs'; // Import API base URL

export async function updateAvatar(avatarUrl) {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('profileName');
    const apiKey = '93e47466-52cc-4e67-bf58-91bf2d198526';
  
    // Validate session
    if (!token || !username) {
      throw new Error('You must be logged in to update the avatar.');
    }
  
    try {
      // Make API request to update avatar
      const response = await fetch(`${API_BASE_URL}/auction/profiles/${username}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify({
          avatar: {
            url: avatarUrl,
            alt: `${username}'s avatar`,
          },
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || 'Failed to update avatar.');
      }
  
      return await response.json(); // Return the updated profile data
    } catch (error) {
      console.error('Error updating avatar:', error.message);
      throw error;
    }
  }
  