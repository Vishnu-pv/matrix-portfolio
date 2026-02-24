/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          green: "#00FF41",
          dark: "#0D0208",
          bright: "#00FF00",
        },
      },
      fontFamily: {
        mono: ['"VT323"', 'monospace'],
      },
    },
  },
  plugins: [],
}
