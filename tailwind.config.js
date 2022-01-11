const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily : {
        montserrat : "'Montserrat', sans"
      },
      colors,
    },
  },
  plugins: [],
};
