/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7A341F',
        'primary-dark': '#5C2415',
      },
    },
  },
  plugins: [],
}
