// Fetch and render listings based on a search query
async function fetchAndRenderListings(query = "") {
    const listingsGrid = document.querySelector("#listingsGrid"); // Listings container
  
    // Clear existing listings
    listingsGrid.innerHTML = "";
  
    try {
      // Fetch listings from the API
      const response = await fetch(
        `https://v2.api.noroff.dev/auction/listings?_active=true&_limit=10&q=${query}`
      );
      const data = await response.json();
  
      // Handle cases where no listings match the query
      if (data.data.length === 0) {
        listingsGrid.innerHTML = `
          <div class="col-span-full text-center text-gray-500">
            No results found for "${query}".
          </div>`;
        return;
      }
  
      // Render each listing
      data.data.forEach((listing) => {
        const listingHTML = `
          <div class="bg-beige shadow-md rounded-lg overflow-hidden">
            <img 
              src="${listing.media?.[0]?.url || "./images/placeholder.png"}" 
              alt="${listing.media?.[0]?.alt || "No image available"}" 
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-semibold">${listing.title}</h3>
              <p class="text-sm text-gray-600">${listing.description || "No description available"}</p>
              <p class="text-sm text-gray-500 mt-2">Ends: ${new Date(listing.endsAt).toLocaleDateString()}</p>
              <button class="bg-lightBrown text-white mt-4 px-4 py-2 rounded-md w-full">View</button>
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
  
  // Attach an event listener to the search input
  document.querySelector("#searchInput").addEventListener("input", (event) => {
    const query = event.target.value.trim();
    fetchAndRenderListings(query);
  });
  
  // Initial fetch to display all listings on page load
  fetchAndRenderListings();
  