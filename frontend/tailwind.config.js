/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // adjust paths as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
