/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // Enable dark mode via class
    theme: {
      extend: {},
    },
    content: [
      "./src/**/*.{html, js,jsx,ts,tsx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [],
  };
  