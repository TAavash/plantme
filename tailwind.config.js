// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        desert: {
          light: "#FAD5A5",
          dark: "#C08457",
        },
      },
    },
  },
  plugins: [],
};
