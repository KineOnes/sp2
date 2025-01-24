import { API_BASE_URL } from "./config.mjs"; // API base URL
import { getAuthToken, getProfileName } from "./auth.mjs"; // Helper functions

const avatarForm = document.getElementById("avatarForm");
const avatarMessage = document.getElementById("avatarMessage");

// Function to update avatar
async function updateAvatar(url) {
  try {
    const profileName = getProfileName(); // Get logged-in user's name
    const token = getAuthToken(); // Get auth token

    if (!profileName || !token) {
      throw new Error("User not logged in or session expired.");
    }

    const response = await fetch(`${API_BASE_URL}/auction/profiles/${profileName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: { url },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update avatar: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating avatar:", error);
    throw error;
  }
}

// Handle form submission
avatarForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const avatarUrl = document.getElementById("avatarUrl").value.trim();

  avatarMessage.textContent = "Updating avatar...";
  avatarMessage.className = "text-gray-700";

  try {
    await updateAvatar(avatarUrl);
    avatarMessage.textContent = "Avatar updated successfully!";
    avatarMessage.className = "text-green-500";
    avatarForm.reset();
  } catch {
    avatarMessage.textContent = "Failed to update avatar. Please try again.";
    avatarMessage.className = "text-red-500";
  }
});
