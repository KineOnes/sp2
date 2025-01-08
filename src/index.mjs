const authButton = document.getElementById("authButton");
const authModal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");
const toggleAuth = document.getElementById("toggleAuth");
const authModalTitle = document.getElementById("authModalTitle");
const submitButton = document.getElementById("submitButton");

// Show the modal
authButton.addEventListener("click", () => {
  authModal.classList.remove("opacity-0", "pointer-events-none");
  authModal.classList.add("opacity-100");
});

// Close the modal
closeModal.addEventListener("click", () => {
  authModal.classList.add("opacity-0", "pointer-events-none");
  authModal.classList.remove("opacity-100");
});

// Toggle between login and register
toggleAuth.addEventListener("click", () => {
  if (authModalTitle.textContent === "Login") {
    authModalTitle.textContent = "Register";
    submitButton.textContent = "Register";
    toggleAuth.textContent = "Already have an account? Login";
  } else {
    authModalTitle.textContent = "Login";
    submitButton.textContent = "Login";
    toggleAuth.textContent = "Don't have an account? Register";
  }
});

// Close the modal when clicking outside it
window.addEventListener("click", (event) => {
  if (event.target === authModal) {
    authModal.classList.add("opacity-0", "pointer-events-none");
    authModal.classList.remove("opacity-100");
  }
});
