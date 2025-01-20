import { getUserData } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  const userName = document.getElementById('userName');
  const userCredit = document.getElementById('userCredit');
  const avatar = document.getElementById('avatar');

  try {
    const userData = await getUserData(); // Fetch user data
    userName.textContent = userData.name || 'Name Nameson';
    userCredit.textContent = `Total credit: ${userData.credits || 0}`;
    avatar.src = userData.avatar?.url || 'https://via.placeholder.com/150';
    avatar.alt = userData.avatar?.alt || 'User avatar';
  } catch (error) {
    console.error('Error fetching user data:', error);
    alert('Could not load profile data.');
  }
});

// Handle buttons
document.getElementById('editProfile').addEventListener('click', () => {
  alert('Edit Profile functionality coming soon!');
});

document.getElementById('createListing').addEventListener('click', () => {
  window.location.href = 'sell.html';
});
