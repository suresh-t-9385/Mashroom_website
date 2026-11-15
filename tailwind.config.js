/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f8f2",
          100: "#ddeee0",
          200: "#bcddc3",
          300: "#8fc49c",
          400: "#5da572",
          500: "#3b8a53",
          600: "#2b6f42",
          700: "#235836",
          800: "#1e482d",
          900: "#193b26",
        },
        earth: {
          50: "#faf7f2",
          100: "#f2ece1",
          200: "#e4d8c4",
          300: "#d2bea0",
          400: "#bd9f79",
          500: "#ab875e",
          600: "#96724f",
          700: "#7c5c42",
          800: "#664c39",
          900: "#553f31",
        },
        cream: { 50: "#fdfcf9", 100: "#faf7f0" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      maxWidth: { content: "1200px" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "none" },
        },
      },
      animation: { "fade-up": "fade-up .5s ease-out both" },
    },
  },
  plugins: [],
};
