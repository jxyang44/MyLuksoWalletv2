/** @type {import('tailwindcss').Config} */


const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom_pink': '#D9AFD9',
        'custom_blue': '#97D9E1',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        primary: ['Open-Sans', 'sans-serif'],
        secondary: ['Oswald', 'sans-serif'],
      },
    },
    
    
    
  },
  plugins: [],
}
