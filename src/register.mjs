const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://v2.api.noroff.dev/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert('Registration successful! Please login.');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      const errorData = await response.json();
      alert('Registration failed: ' + (errorData.errors?.[0]?.message || 'Unknown error'));
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }
});
