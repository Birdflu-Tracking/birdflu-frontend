/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  
      colors: {
      textSecondary: "#3E3E3E",
      primary: 'rgb(var(--color-primary))',
      secondary: 'rgb(var(--color-secondary))',
      tertiary: 'rgb(var(--color-tertiary))',
      light: 'rgb(var(--color-border) / 10%)',
      labelBg: 'rgb(var(--color-label-bg))',
      lightPlaceholder: 'rgb(var(--color-light-placeholder))',
      white: 'rgb(var(--color-white))',
      transparent: 'rgb(0 0 0 / 0)'
    },
    extend: {
      fontFamily: {
        Poppins: ['Popins', "sans-pserif"]
      }
    },
  },
  plugins: [],
};
