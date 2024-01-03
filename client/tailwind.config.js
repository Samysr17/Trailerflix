/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      'off-white': 'rgba(37,37,37,0.61)',
    }},
  },
  plugins: [],
}