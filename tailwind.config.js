const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#df378bd7',
        secondary: '#a9a9a9',
        'bg-light': '#ffffff',
        'bg-dark': '#2c2c2c',
        'text-light': '#333333',
        'text-dark': '#ffffff',
      },
      backgroundImage: {
        'navbar-light': 'linear-gradient(135deg, #ce4e8e, #878686)',
        'navbar-dark': 'linear-gradient(135deg, #3a3a3a, #ff69b4)',
        'component-light': 'linear-gradient(135deg, #f4a5cd, #b5abb0c0, #6c6a6a)',
        'component-dark': 'linear-gradient(135deg, #3a3a3a, #ff69b4, #2c2c2c)',
      },
      boxShadow: {
        'card-light': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 10px 30px rgba(0, 0, 0, 0.3)',
        'card-hover-light': '0 15px 35px rgba(0, 0, 0, 0.2)',
        'card-hover-dark': '0 15px 35px rgba(255, 105, 180, 0.3)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 0, 255, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(255, 0, 255, 0)' },
        }
      },
      animation: {
        pulse: 'pulse 0.5s',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },
        '.text-shadow-lg': {
          textShadow: '0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08)',
        },
      }
      addUtilities(newUtilities)
    })
  ],
}

// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  // ...
}


