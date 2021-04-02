const colors = require('tailwindcss/colors')
module.exports = {
  purge: [
    'index.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose:colors.rose,
      },
      fontFamily:{
        'p'  : 'JetBrains Mono, monospace',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
