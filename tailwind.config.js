/** @type {import('tailwindcss').Config} */


// const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        animation: {
          'pulse-slow': 'pulse 3s ease-in-out infinite',
          'spin-CW-5': "spinCW 5s linear infinite",
          'spin-CW-10': "spinCW 10s linear infinite",
          'spin-CW-20': "spinCW 20s linear infinite",
          'spin-CCW-5': "spinCCW 5s linear infinite",
          'spin-CCW-10': 'spinCCW 10s linear infinite',
          'spin-CCW-20': 'spinCCW 20s linear infinite',
          'fadeInLeft': 'fadeInLeft 1s forwards',
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
          },
          spinCCW: { 
            '0%': { transform: 'rotate(0deg)', stroke: 'white'},
            '50%': { stroke: 'grey' }, 
            '100%': { transform: 'rotate(-360deg)' , stroke: 'white'},
          },
          spinCW: { 
            '0%': { transform: 'rotate(0deg)', stroke: 'white'},
            '50%': { stroke: 'grey' }, 
            '100%': { transform: 'rotate(360deg)' , stroke: 'white'},
          },
          spinBorderCW: { 
            '0%': { transform: 'rotate(0deg)', stroke: 'white'},
            '50%': { stroke: 'grey' }, 
            '100%': { transform: 'rotate(360deg)' , stroke: 'white'},
          }, 
          fadeInLeft: { 
            '0%' : { transform: 'translateX(-3%)', opacity:'0' },
            '60%' : { transform: 'translateX(1%)' },
            '100%' : { transform: 'translateX(0%)', opacity:'1' }
          }
        }
      }
    },   
  plugins: [require('@tailwindcss/forms')],
}
