/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",    // Root HTML file
    "./*.html",        // All HTML files in the root directory
    "./src/**/*.mjs",  // JavaScript/ESM files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        beige: "#F6F0E5",       // Background for listings
        olive: "#4A5B21",       // Login button background
        lightOlive: "#A8B88D",  // Search bar background
        lightBrown: "#C4B29B",  // Button background
        darkText: "#333333",    // Text color for headings
      },
      fontSize: {
        xxl: "3rem",            // Custom font size for the "AGAIN" logo
      },
      fontWeight: {
        thin: "200",            // Thinner font weight for the "AGAIN" logo
      },
      spacing: {
        128: "32rem",           // Custom spacing
      },
      borderRadius: {
        xl: "1.5rem",           // Custom rounded corners
      },
      zIndex: {
        100: "100",             // Custom z-index for modals
      },
    },
  },
  plugins: [],
};
