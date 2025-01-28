import { getUserData } from './utils.mjs';
import { updateAvatar } from './updateAvatar.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  const userName = document.getElementById('userName');
  const userCredit = document.getElementById('userCredit');
  const avatar = document.getElementById('avatar');
  const avatarForm = document.getElementById('avatarForm');
  const avatarUrlInput = document.getElementById('avatarUrl');
  const avatarMessage = document.getElementById('avatarMessage');

  try {
    // Fetch user data
    const userData = await getUserData();

    if (!userData) {
      throw new Error('No user data returned.');
    }

    // Populate user data on the page
    userName.textContent = userData.name || 'Name Nameson';
    userCredit.textContent = `Total credit: ${userData.credits || 0}`;
    avatar.src = userData.avatar?.url || 'https://via.placeholder.com/150';
    avatar.alt = userData.avatar?.alt || 'User avatar';
  } catch (error) {
    console.error('Error fetching user data:', error);
    alert('Could not load profile data. Please log in again.');
    window.location.href = 'login.html'; // Redirect to login page
  }

  // Handle avatar update form submission
  avatarForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newAvatarUrl = avatarUrlInput.value;

    try {
      const updatedAvatar = await updateAvatar(newAvatarUrl);

      // Update avatar on the page
      avatar.src = updatedAvatar.url;
      avatar.alt = updatedAvatar.alt || 'User avatar';
      avatarMessage.textContent = 'Avatar updated successfully!';
      avatarMessage.classList.remove('text-red-500');
      avatarMessage.classList.add('text-green-500');
    } catch (error) {
      console.error('Error updating avatar:', error);
      avatarMessage.textContent = 'Failed to update avatar. Please try again.';
      avatarMessage.classList.remove('text-green-500');
      avatarMessage.classList.add('text-red-500');
    }
  });
});
