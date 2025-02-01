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
        brown: "#6A5D4D",       // Darker cool brown, twice as dark as lightBrown
        burntPeach: "#B76E50",  // Login/register button bakcground. Muted, earthy peach
        olive: "#4A5B21",       // alternative color for numbers in design
        lightOlive: "#A8B88D",  // Search bar background
        lightBrown: "#C4B29B",  // Button background
        darkText: "#333333",    // Text color for headings
        mediumBrown: "#947F68", // A balanced brown between lightBrown and dark brown
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
