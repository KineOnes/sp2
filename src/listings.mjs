// listings.mjs
async function fetchListings() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auction/listings'); // Fetch data
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        const listings = await response.json(); // Parse JSON
        renderListings(listings); // Render listings dynamically
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

function renderListings(listings) {
    const container = document.querySelector('.grid'); // Grid container
    if (!listings.length) {
        container.innerHTML = '<p>No listings found.</p>'; // Handle empty listings
        return;
    }

    container.innerHTML = listings
        .map(
            (listing) => `
            <div class="bg-beige p-4 rounded-md shadow-md">
              <img
                src="${listing.media[0]?.url || 'https://via.placeholder.com/150'}"
                alt="${listing.title}"
                class="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 class="text-lg font-medium mb-2">${listing.title}</h3>
              <p class="text-sm text-gray-600">${listing.description || 'No description available'}</p>
              <div class="flex justify-between items-center mt-4">
                <button class="bg-lightBrown text-white px-4 py-2 rounded-md">
                  View
                </button>
                <span class="text-sm text-gray-500">
                  Ends: ${new Date(listing.endsAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          `
        )
        .join('');
}

fetchListings(); // Call fetchListings when the page loads
