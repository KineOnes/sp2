console.log("listings.mjs loaded");

let currentPage = 1;

// Function to fetch listings
async function fetchListings(searchQuery = "", page = 1, limit = 100) {
  try {
    const url = `https://v2.api.noroff.dev/auction/listings?_bids=true&_seller=true&_active=true&sort=created&_order=desc&_page=${page}&_limit=${limit}${
      searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""
    }`;

    console.log("Fetching URL:", url); // Debugging: Log the fetch URL

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": "93e47466-52cc-4e67-bf58-91bf2d198526",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Fetched Listings:", result.data); // Debugging: Log fetched listings

    renderListings(result.data); // Render the filtered listings
  } catch (error) {
    console.error("Error fetching listings:", error);
    document.getElementById("listingsGrid").innerHTML =
      "<p>Error loading listings.</p>";
  }
}

// Function to render listings
function renderListings(listings) {
  const container = document.getElementById("listingsGrid");
  if (!container) {
    console.error("Listings container not found!");
    return;
  }

  if (listings.length === 0) {
    container.innerHTML = "<p>No listings found.</p>";
    return;
  }

  container.innerHTML = listings
    .map((listing) => {
      const imageUrl =
        listing.media && listing.media.length > 0 && listing.media[0].url
          ? listing.media[0].url
          : "./images/placeholder.png";

      console.log("Rendering image URL:", imageUrl); // Debugging

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
            <button class="bg-lightBrown text-white px-4 py-2 rounded-md view-btn" data-id="${listing.id}">
              View
            </button>
            <span class="text-sm text-gray-500">
              Ends: ${new Date(listing.endsAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const listingId = event.target.getAttribute("data-id");
      window.location.href = `item.html?id=${listingId}`;
    });
  });
}

// Add event listener to search input
document.getElementById("searchInput")?.addEventListener("keyup", (event) => {
  const searchQuery = event.target.value.trim();
  console.log("Search triggered with query:", searchQuery);
  fetchListings(searchQuery); // Fetch listings with the search query
});

// Initial fetch of all listings
fetchListings();
