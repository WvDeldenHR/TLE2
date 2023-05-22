/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark': '#212427',
        'primary': '#519859',
        'error': "#ed1c24",
      },
      borderColor: {
        'primary': '#519859',
      },
      fontSize: {
        'xxs': '0.625rem',
        'xxxs': '.5rem',
      },
      placeholderColor: {
        'dark': '#212427',
      },
      spacing: {
        '38': '9.5rem',
        '30': '7.5rem',
      },
      textColor: {
        'dark': '#212427',
        'primary': '#519859',
      },
    },
  },
  plugins: [],
}

