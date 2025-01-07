/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        "quarter": "25vh",
        "half": "50vh"
      },
      width: {
        "30%": "30%",
      },
      colors: {
        "jinx-skin": "#BF907E",
        "jinx-pants": "#A6587C",
        "jinx-pants-light": "#D684AA",
        "jinx-top": "#261A1A",
        "jinx-hair": "#395273",
        "jinx-hair-dark": "#28384E",
        "jinx-tattoo": "#89CFF0"
        
      }
    },
  },
  plugins: [],
}

