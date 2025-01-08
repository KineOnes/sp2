export async function fetchProfile() {
    const profileContainer = document.querySelector('#profileForm');
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the token
  
    if (!accessToken) {
      alert('You must be logged in to view the profile.');
      window.location.href = 'login.html';
      return;
    }
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auction/profiles/<your-username>', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
  
      const profile = await response.json(); // Parse the JSON response
  
      // Populate the form with user profile data
      document.querySelector('#name').value = profile.name;
      document.querySelector('#email').value = profile.email;
      document.querySelector('#avatar').value = profile.avatar;
      document.querySelector('#credits').textContent = profile.credits;
    } catch (error) {
      console.error(error);
      alert('Error fetching profile. Please try again.');
    }
  }
  
  export async function updateProfile(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
  
    const name = document.querySelector('#name').value;
    const avatar = document.querySelector('#avatar').value;
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auction/profiles/<your-username>', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, avatar }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
  
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating profile. Please try again.');
    }
  }
  