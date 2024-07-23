/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        segoe: ['"Segoe UI "', '"Segoe UI"', "sans-serif"],
      },
      colors: { "custom-purple": "#5F249F" },
    },
  },
  plugins: [],
};
