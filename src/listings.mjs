console.log("listings.mjs loaded"); // Debugging: Ensure the script is loaded

let currentPage = 1; // Initialize the current page

async function fetchListings(page = 1) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings?_bids=true&_seller=true&_page=${page}&_active=true`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": "93e47466-52cc-4e67-bf58-91bf2d198526",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Listings Data:", result); // Debugging: Log the fetched data

    renderListings(result.data); // Pass only the data to render function
    handlePagination(result.meta); // Pass pagination metadata
  } catch (error) {
    console.error("Error fetching listings:", error);
    document.getElementById("listingsGrid").innerHTML = "<p>Error loading listings.</p>";
  }
}

function renderListings(listings) {
  const container = document.getElementById("listingsGrid");
  if (!container) {
    console.error("Listings container not found!");
    return;
  }

  container.innerHTML = listings
    .map((listing) => {
        const imageUrl = listing.media?.[0]?.url || "/images/placeholder.png"; // Use local placeholder



      return `
        <div class="bg-beige p-4 rounded-md shadow-md">
          <img
            src="${imageUrl}"
            alt="${listing.title || "No Title"}"
            class="w-full h-40 object-cover rounded-md mb-4"
            onerror="this.src='https://via.placeholder.com/150';"
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

  document.querySelectorAll(".view-btn").forEach((button) =>
    button.addEventListener("click", (event) => {
      const listingId = event.target.getAttribute("data-id");
      window.location.href = `item.html?id=${listingId}`;
    })
  );
}

function handlePagination(meta) {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  if (meta.isFirstPage) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
    prevButton.onclick = () => {
      currentPage--;
      fetchListings(currentPage);
    };
  }

  if (meta.isLastPage) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
    nextButton.onclick = () => {
      currentPage++;
      fetchListings(currentPage);
    };
  }
}

// Fetch listings for the first page on load
fetchListings(currentPage);
