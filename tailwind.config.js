/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        dark: {
          900: "#080f08",
          800: "#0e1b0e",
          700: "#162416",
          600: "#1d301d",
          500: "#243d24",
          400: "#2e5030",
        },
        gold: {
          300: "#f0c96a",
          400: "#e8b84b",
          500: "#d4a853",
          600: "#b8892f",
        },
        cream: {
          50: "#fdfaf4",
          100: "#f4efe4",
          200: "#e8dcc8",
          300: "#d4c4a0",
        },
        sage: {
          300: "#8fb88f",
          400: "#6a9e6a",
          500: "#4a7c4a",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
