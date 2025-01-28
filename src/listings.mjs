// Fetch and render listings
async function fetchAndRenderListings(query = "") {
    const listingsGrid = document.querySelector("#listingsGrid"); // Listings container

    // Clear existing listings
    listingsGrid.innerHTML = "";

    try {
        // Construct the URL with query
        const baseUrl = "https://v2.api.noroff.dev/auction/listings";
        const url = query
            ? `${baseUrl}/search?q=${encodeURIComponent(query)}`
            : `${baseUrl}?_active=true&_limit=10`;

        // Fetch listings
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": "YOUR_API_KEY_HERE", // Replace with your API key
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch listings: ${response.statusText}`);
        }

        const data = await response.json();

        // Access the correct data property
        const listings = data.data; // Ensure you're accessing the correct property

        // Handle empty results
        if (!listings || listings.length === 0) {
            listingsGrid.innerHTML = `
                <div class="col-span-full text-center text-gray-500">
                    ${query ? `No results found for "${query}".` : "No listings available."}
                </div>`;
            return;
        }

        // Render listings
        listings.forEach((listing) => {
            const imageUrl = listing.media?.[0]?.url || "./images/placeholder.png";
            const endsAt = listing.endsAt ? new Date(listing.endsAt).toLocaleDateString() : "No deadline";

            const listingHTML = `
                <div class="bg-beige shadow-md rounded-lg overflow-hidden">
                    <img 
                        src="${imageUrl}" 
                        alt="${listing.title || "No title"}" 
                        class="w-full h-48 object-cover"
                    />
                    <div class="p-4">
                        <h3 class="text-lg font-semibold">${listing.title || "No Title"}</h3>
                        <p class="text-sm text-gray-600">${listing.description || "No description available"}</p>
                        <p class="text-sm text-gray-500 mt-2">Ends: ${endsAt}</p>
                        <button 
                            class="view-button bg-lightBrown text-white mt-4 px-4 py-2 rounded-md w-full" 
                            data-id="${listing.id}">
                            View
                        </button>
                    </div>
                </div>
            `;
            listingsGrid.insertAdjacentHTML("beforeend", listingHTML);
        });
    } catch (error) {
        console.error("Error fetching listings:", error);
        listingsGrid.innerHTML = `
            <div class="col-span-full text-center text-red-500">
                Error fetching listings. Please try again later.
            </div>`;
    }
}

// Handle "View" button click using event delegation
document.querySelector("#listingsGrid").addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("view-button")) {
        const listingId = target.dataset.id;
        if (listingId) {
            // Redirect to item.html with the listing ID as a query parameter
            window.location.href = `item.html?id=${listingId}`;
        }
    }
});

// Search input event listener
document.querySelector("#searchInput").addEventListener("input", (event) => {
    const query = event.target.value.trim();
    fetchAndRenderListings(query);
});

// Initial fetch
fetchAndRenderListings();
