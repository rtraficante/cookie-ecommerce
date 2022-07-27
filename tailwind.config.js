/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{js,jsx,ts,tsx, html, css}",
    "./client/**/*.{js,jsx,ts,tsx, html, css}",
    "./components/**/*.{js,jsx,ts,tsx, html, css}",
    "./public/index.html",
    "./public/bundle.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
