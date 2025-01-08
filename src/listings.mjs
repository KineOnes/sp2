const API_URL = "https://v2.api.noroff.dev/auction/listings";

const listingsContainer = document.getElementById("listingsContainer");

// Fetch listings from the API
async function fetchListings() {
  try {
    listingsContainer.innerHTML = "<p>Loading...</p>";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch listings. Please check the API endpoint.");
    }

    const listings = await response.json();

    if (listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings found.</p>";
      return;
    }

    renderListings(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    listingsContainer.innerHTML = "<p>Error loading listings. Please try again later.</p>";
  }
}

// Render the listings dynamically
function renderListings(listings) {
  listingsContainer.innerHTML = listings
    .map((listing) => {
      const { title, media, description, endsAt } = listing;
      return `
        <div class="bg-beige p-4 rounded-md shadow-md">
          <div class="h-32 bg-gray-300 rounded-md mb-4">
            <img src="${media[0] || "https://via.placeholder.com/150"}" 
                 alt="${title}" 
                 class="w-full h-full object-cover rounded-md" />
          </div>
          <h3 class="text-lg font-medium mb-2">${title}</h3>
          <p class="text-sm">${description || "No description available."}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-sm text-gray-500">
              Ends: ${new Date(endsAt).toLocaleString()}
            </span>
            <button class="bg-lightBrown text-white px-4 py-2 rounded-md">
              Bid
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

// Fetch listings on page load
fetchListings();
