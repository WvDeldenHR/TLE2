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
      },
      borderColor: {
        'primary': '#519859',
      },
      fontSize: {
        'xxs': '.5rem',
      },
      spacing: {
        '38': '9.5rem',
      },
      textColor: {
        'dark': '#212427',
        'primary': '#519859',
      },
    },
  },
  plugins: [],
}

