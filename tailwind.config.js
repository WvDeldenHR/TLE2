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
        'dark': '#212427',
        'primary': '#519859',
        'error': "#ed1c24",
      },
      borderWidth: {
        '1': '1px',
      },
      fill: {
        'white': '#ffffff',
        'gray-400': 'rgb(156 163 175)',
      },
      fontSize: {
        'xxs': '0.625rem',
        'xxxs': '.5rem',
      },
      height: {
        '18': '4.5rem',
      },
      minHeight: {
        '72': '18rem',
      },
      placeholderColor: {
        'dark': '#212427',
      },
      spacing: {
        '0.5': '0.125rem',
        '38': '9.5rem',
        '30': '7.5rem',
      },
      textColor: {
        'dark': '#212427',
        'primary': '#519859',
        'error': "#ed1c24",
      },
    },
  },
  plugins: [],
}

