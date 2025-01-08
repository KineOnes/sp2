// Function to fetch listings from the API
export async function fetchListings() {
    const container = document.querySelector('.grid'); // Listings container
    container.innerHTML = '<p>Loading...</p>'; // Loading message
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auction/listings');
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
  
      const data = await response.json(); // Parse the JSON response
      renderListings(data.data); // Render listings
    } catch (error) {
      console.error(error);
      container.innerHTML = '<p>Error loading listings. Please try again later.</p>';
    }
  }
  
  // Function to render the listings dynamically
  function renderListings(listings) {
    const container = document.querySelector('.grid'); // Listings container
    container.innerHTML = listings
      .map(
        (listing) => `
          <div class="bg-beige p-4 rounded-md shadow-md">
            <div class="h-32 bg-gray-300 rounded-md mb-4">
              <img src="${listing.media[0]?.url || 'https://via.placeholder.com/150'}" 
                   alt="${listing.title}" 
                   class="w-full h-full object-cover rounded-md" />
            </div>
            <h3 class="text-lg font-medium mb-2">${listing.title}</h3>
            <p>${listing.description || 'No description available'}</p>
            <div class="flex justify-between items-center">
              <button class="bg-lightBrown text-white px-4 py-2 rounded-md">
                Bid
              </button>
              <span class="text-sm text-gray-500">
                Time left: ${new Date(listing.endsAt).toLocaleString()}
              </span>
            </div>
          </div>
        `
      )
      .join('');
  }
  