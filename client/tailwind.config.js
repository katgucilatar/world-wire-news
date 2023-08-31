import { DEFAULT_MIN_BREAKPOINT } from 'react-bootstrap/esm/ThemeProvider';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", 
    "./src/**/*.css"
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      newsRed: "#BD352A",
      newsGray: "#CFD0D6",
      newsBlue: "#2E368F",
      newsGrayBlue: "#717F94",
      newsBlack: "#000000",
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
