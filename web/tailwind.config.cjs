/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      },

      colors: {
        bg: '#09090a'
      },

      gridTemplateRows: {
        7: 'repeat(7, minmax(0,1fr))'
      },
      boxShadow: {
        customShadow: 'rbga(0,0,0,0.75)'
      }
    },
  },
  plugins: [],
}
