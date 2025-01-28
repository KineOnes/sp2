console.log("sell.mjs loaded"); // Debugging

const sellForm = document.getElementById("sellForm");
const resultMessage = document.getElementById("resultMessage");

sellForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const deadline = document.getElementById("deadline").value;

  if (!title || !deadline) {
    resultMessage.textContent = "Title and Deadline are required.";
    resultMessage.className = "text-red-500";
    return;
  }

  const token = localStorage.getItem("authToken");
  if (!token) {
    resultMessage.textContent = "Error: You must be logged in to create a listing.";
    resultMessage.className = "text-red-500";
    return;
  }

  const payload = {
    title,
    description: description || undefined,
    media: image ? [{ url: image }] : [],
    endsAt: new Date(deadline).toISOString(),
  };

  try {
    const response = await fetch("https://v2.api.noroff.dev/auction/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "93e47466-52cc-4e67-bf58-91bf2d198526",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      resultMessage.textContent = `Error: ${error.errors?.[0]?.message || "Unable to create listing."}`;
      resultMessage.className = "text-red-500";
      return;
    }

    resultMessage.textContent = "Listing created successfully!";
    resultMessage.className = "text-green-500";
    sellForm.reset();
  } catch (error) {
    console.error("Error creating listing:", error);
    resultMessage.textContent = "Error: Unable to create listing.";
    resultMessage.className = "text-red-500";
  }
});
