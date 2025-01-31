import { getUserInfo, saveUserAvatar } from "./auth.mjs";
import { updateAvatar } from "./updateAvatar.mjs";

document.addEventListener("DOMContentLoaded", function () {
    const userInfo = getUserInfo();
    
    // Update profile information on page load
    document.getElementById("userName").textContent = userInfo.username;
    document.getElementById("avatar").src = userInfo.avatar;
    
    const avatarForm = document.getElementById("avatarForm");
    const avatarInput = document.getElementById("avatarUrl");
    const avatarMessage = document.getElementById("avatarMessage");

    avatarForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const newAvatarUrl = avatarInput.value.trim();

        if (!newAvatarUrl) {
            avatarMessage.textContent = "Please enter a valid avatar URL!";
            avatarMessage.style.color = "red";
            return;
        }

        try {
            // Call updateAvatar API function
            await updateAvatar(newAvatarUrl);

            // Save new avatar locally
            saveUserAvatar(newAvatarUrl);

            // Update UI
            document.getElementById("avatar").src = newAvatarUrl;
            avatarMessage.textContent = "Avatar updated successfully!";
            avatarMessage.style.color = "green";

            // Clear the input field after update
            avatarInput.value = "";

            // Wait for a moment before refreshing the page
            setTimeout(() => {
                location.reload();
            }, 1000); // Reload after 1 second

        } catch (error) {
            console.error("Error updating avatar:", error);
            avatarMessage.textContent = "Failed to update avatar!";
            avatarMessage.style.color = "red";
        }
    });
});
