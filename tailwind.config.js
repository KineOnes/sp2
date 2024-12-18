/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"], // Add the path to your HTML files
  theme: {
    extend: {
      colors: {
        beige: "#F6F0E5",          // Background for listings
        olive: "#A8B885",          // Search bar background
        lightBrown: "#C4B29B",     // Button background
        darkText: "#333333",       // Text color for headings
      },
    },
  },
  plugins: [],
}
