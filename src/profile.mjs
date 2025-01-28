import { getUserData } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  const userName = document.getElementById('userName');
  const userCredit = document.getElementById('userCredit');
  const avatar = document.getElementById('avatar');

  try {
    const userData = await getUserData(); // Fetch user data
    if (!userData) {
      throw new Error('No user data returned');
    }
    userName.textContent = userData.name || 'Name Nameson';
    userCredit.textContent = `Total credit: ${userData.credits || 0}`;
    avatar.src = userData.avatar?.url || 'https://via.placeholder.com/150';
    avatar.alt = userData.avatar?.alt || 'User avatar';
  } catch (error) {
    console.error('Error fetching user data:', error);
    alert('Could not load profile data. Please log in again.');
    window.location.href = 'login.html'; // Redirect to login page
  }
});
