export async function handleLogin(event) {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auction/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken); // Save token
      alert('Login successful');
      window.location.href = 'listings.html';
    } catch (error) {
      console.error(error);
      alert('Error logging in. Please try again.');
    }
  }
  