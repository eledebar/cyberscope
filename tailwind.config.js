/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        scope: {
          50: "#eefbf1",
          100: "#d7f5de",
          200: "#b1eabd",
          300: "#7bd98e",
          400: "#3DCD58",
          500: "#27af44",
          600: "#198c35",
          700: "#176f2d",
          800: "#175927",
          900: "#144921",
          950: "#072811"
        }
      },
      boxShadow: {
        panel: "0 12px 32px -20px rgb(15 23 42 / 0.28)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};
