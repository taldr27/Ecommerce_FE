/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'scustom': '1150px',
      },
    },
  },
  plugins: [],
}

