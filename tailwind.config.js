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
          'closeVault': 'spinCCW 3s ease-out forwards',
          'fadeInLeft': 'fadeInLeft 1s forwards',
          'fadeInTop': 'fadeInTop 4s forwards ease-in',
          'coin-spin-appear': 'coinSpinAppear 0.6s forwards ease-in',
          'coin-spin-disappear': 'coinSpinDisappear 1.0s forwards ease-out',
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
          },
          fadeInTop: { 
            '0%' : { transform: 'translateY(-12%)', opacity:'0' },
            '60%' : { transform: 'translateY(1%)' },
            '100%' : { transform: 'translateY(0%)', opacity:'1' }
          },
          coinSpinAppear: {
            '0%' : { transform: 'rotateY(0deg)'},
            '100%' : { transform: 'rotateY(90deg)'}
          },
          coinSpinDisappear: {
            '0%' : { transform: 'rotateY(90deg)'},
            '100%' : { transform: 'rotateY(0deg)'}
          },
        }
      }
    },   
  plugins: [require('@tailwindcss/forms')],
}
