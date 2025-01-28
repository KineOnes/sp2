console.log("item.mjs loaded");

// Get the item ID from the URL
const itemId = new URLSearchParams(window.location.search).get("id");
console.log("Item ID:", itemId); // Ensure the ID is logged for debugging

const itemContainer = document.querySelector("#item-details");
const bidForm = document.querySelector("#bid-form");
const bidInput = document.querySelector("#bidAmount");

// Function to fetch item details from the API
async function fetchItemDetails() {
  try {
    // Check if the item ID is valid
    if (!itemId) {
      throw new Error("Invalid or missing item ID in the URL");
    }

    const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${itemId}?_bids=true`);
    if (!response.ok) {
      throw new Error(`Failed to fetch item details. Status: ${response.status}`);
    }

    const { data: item } = await response.json();
    if (!item) {
      throw new Error("Item data is empty or malformed");
    }

    console.log("Fetched Item Details:", item); // Log the details for debugging
    renderItemDetails(item);
  } catch (error) {
    console.error("Error fetching item details:", error);
    itemContainer.innerHTML = `<p class="text-red-500">Error loading item details. Please try again later.</p>`;
  }
}

// Function to render the item details
function renderItemDetails(item) {
  const highestBid = item.bids.length ? Math.max(...item.bids.map((bid) => bid.amount)) : 0;

  // Render item details in the container
  itemContainer.innerHTML = `
    <div class="bg-beige p-4 rounded-md shadow-md">
      <img
        src="${item.media?.[0]?.url || './images/placeholder.png'}"
        alt="${item.title || 'No title available'}"
        class="w-full h-60 object-cover rounded-md mb-4"
        onerror="this.src='./images/placeholder.png'" <!-- Fallback for inaccessible images -->
      />
      <h2 class="text-2xl font-semibold">${item.title || "No Title"}</h2>
      <p>${item.description || "No description available."}</p>
      <p><strong>Ends:</strong> ${item.endsAt ? new Date(item.endsAt).toLocaleDateString() : "Invalid Date"}</p>
      <p><strong>Current highest bid:</strong> ${highestBid}</p>
    </div>
  `;
}

// Event listener for the bid form
bidForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const bidAmount = parseInt(bidInput.value, 10);
  if (isNaN(bidAmount) || bidAmount <= 0) {
    alert("Please enter a valid bid amount.");
    return;
  }

  const payload = { amount: bidAmount };
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("You must be logged in to place a bid.");
    return;
  }

  try {
    console.log("Submitting bid with payload:", payload);

    const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${itemId}/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "93e47466-52cc-4e67-bf58-91bf2d198526", // Add your API key here
        },
        body: JSON.stringify(payload),
      });
      

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || "Failed to place bid");
    }

    alert("Bid placed successfully!");
    bidInput.value = ""; // Clear the input field
    fetchItemDetails(); // Refresh the item details to show the updated highest bid
  } catch (error) {
    console.error("Error placing bid:", error);
    alert(`Error placing bid: ${error.message}`);
  }
});

// Fetch item details when the page loads
fetchItemDetails();
