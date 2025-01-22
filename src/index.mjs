console.log("index.mjs loaded"); // Debugging: Ensure the script is loaded

// Function to fetch new listings
async function fetchNewListings() {
  try {
    console.log("Fetching new listings..."); // Debugging: Ensure this function is called

    const response = await fetch(
      "https://v2.api.noroff.dev/auction/listings?_bids=true&_seller=true&_active=true&_sort=created&_order=desc&_limit=6",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": "93e47466-52cc-4e67-bf58-91bf2d198526",
        },
      }
    );

    console.log("API response status:", response.status); // Debugging: Check API status

    if (!response.ok) {
      throw new Error(`Error fetching new listings: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched Data:", data); // Debugging: Check fetched data structure

    renderNewListings(data.data); // Render listings
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("newListingsError").classList.remove("hidden");
  }
}

// Function to render listings on the index page
function renderNewListings(listings) {
  console.log("Rendering Listings:", listings); // Debugging: Check the data passed to render

  const container = document.getElementById("newListingsGrid");
  if (!container) {
    console.error("New Listings container not found!");
    return;
  }

  // If no listings are found
  if (!listings || listings.length === 0) {
    container.innerHTML = "<p class='text-center'>No new listings found.</p>";
    return;
  }

  // Populate listings grid dynamically
  container.innerHTML = listings
    .map((listing) => {
      const imageUrl = listing.media?.[0]?.url || "./images/placeholder.png";

      return `
        <div class="bg-beige p-4 rounded-md shadow-md">
          <img
            src="${imageUrl}"
            alt="${listing.title || "No Title"}"
            class="w-full h-40 object-cover rounded-md mb-4"
            onerror="this.src='./images/placeholder.png';"
          />
          <h3 class="text-lg font-medium mb-2">${listing.title || "No Title"}</h3>
          <p class="text-sm text-gray-600">${listing.description || "No description available"}</p>
          <div class="flex justify-between items-center mt-4">
            <a
              href="item.html?id=${listing.id}"
              class="bg-lightBrown text-white px-4 py-2 rounded-md"
            >
              View
            </a>
            <span class="text-sm text-gray-500">
              Ends: ${new Date(listing.endsAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      `;
    })
    .join("");
}

// Fetch the latest 6 listings on page load
fetchNewListings();
