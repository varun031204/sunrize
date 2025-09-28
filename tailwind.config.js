/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        nasa: {
          blue: '#0B3D91',
          red: '#FC3D21',
          dark: '#1a1a1a'
        }
      },
      fontFamily: {
        'nasa': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}