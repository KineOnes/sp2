console.log('item.mjs loaded'); // Debugging: Check if the script is running

// Get the listing ID from the URL
const params = new URLSearchParams(window.location.search);
const listingId = params.get('id');

if (!listingId) {
    console.error('No listing ID found in the URL!');
    document.getElementById('item-details').innerHTML = '<p>Error loading item details.</p>';
} else {
    fetchListingDetails();
}

async function fetchListingDetails() {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${listingId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch item details');
        }
        const listing = await response.json();
        console.log('Fetched listing:', listing); // Debugging: Log fetched listing
        renderListingDetails(listing);
    } catch (error) {
        console.error('Error fetching item details:', error);
        document.getElementById('item-details').innerHTML = '<p>Error loading item details.</p>';
    }
}

function renderListingDetails(listing) {
    const container = document.getElementById('item-details');

    if (!listing) {
        container.innerHTML = '<p>Error: Listing details could not be loaded.</p>';
        return;
    }

    // Safely access media, title, description, and end date
    const imageUrl = listing.media && listing.media.length > 0 ? listing.media[0].url : 'https://via.placeholder.com/150';
    const title = listing.title || 'No title available';
    const description = listing.description || 'No description available.';
    const endsAt = listing.endsAt ? new Date(listing.endsAt).toLocaleDateString() : 'No end date';

    container.innerHTML = `
        <img
            src="${imageUrl}"
            alt="${title}"
            class="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 class="text-3xl font-semibold mb-4">${title}</h2>
        <p class="text-lg text-gray-700 mb-4">${description}</p>
        <p class="text-sm text-gray-500">Ends: ${endsAt}</p>
    `;
}

// Handle bid submission
const bidForm = document.getElementById('bid-form');
bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const bidAmount = document.getElementById('bidAmount').value;

    if (!bidAmount) {
        alert('Please enter a bid amount.');
        return;
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${listingId}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: parseFloat(bidAmount) }),
        });

        if (!response.ok) {
            throw new Error('Failed to place bid');
        }

        alert('Bid placed successfully!');
        fetchListingDetails(); // Refresh the item details to show updated data
    } catch (error) {
        console.error('Error placing bid:', error);
        alert('Error placing bid. Please try again.');
    }
});
