/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/**/*.css"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      newsRed: "#BD352A",
      newsGray: "#CFD0D6",
      newsBlue: "#282361",
      newsGrayBlue: "#717F94",
      newsBlack: "#000000",
    },
    extend: {},
  },
  plugins: [],
};
