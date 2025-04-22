import daisyui from "../FRONTEND/node_modules/daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui : {
    themes: true
  }
};
