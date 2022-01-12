const { zinc } = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      zinc,
    },
    extend: {
      fontFamily : {
        montserrat : "'Montserrat', sans"
      },
    },
  },
  plugins: [],
};
