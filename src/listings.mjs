console.log('listings.mjs loaded'); // Debugging: Check if the script is running

async function fetchListings() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/auction/listings'); // Fetch data
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        const result = await response.json(); // Parse JSON
        console.log('Listings Data:', result); // Debugging: Check fetched listings
        renderListings(result.data); // Render the "data" array from the API
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

function renderListings(listings) {
    const container = document.querySelector('.grid'); // Find the grid container
    if (!container) {
        console.error('Grid container not found!');
        return;
    }
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
                <button class="bg-lightBrown text-white px-4 py-2 rounded-md view-btn" data-id="${listing.id}">
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

    // Add event listeners to the "View" buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach((button) =>
        button.addEventListener('click', (event) => {
            const listingId = event.target.getAttribute('data-id');
            window.location.href = `item.html?id=${listingId}`; // Redirect to item.html with the listing ID
        })
    );
}

fetchListings(); // Call fetchListings when the page loads
