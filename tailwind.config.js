/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#519859',
        'dark': '#212427',
      },
      fontSize: {
        'xxs': '.5rem',
      },
      textColor: {
        'dark': '#212427',
      },
    },
  },
  plugins: [],
}

