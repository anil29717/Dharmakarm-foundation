/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Default font for content
        heading: ['Poppins', 'sans-serif'], // Font for navbar
      },
    },
  },
  plugins: [],
}

