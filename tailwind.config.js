/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0C12",
          900: "#0D1017",
          800: "#141824",
          700: "#1B2030",
          600: "#232A3D",
          border: "#262C40",
        },
        paper: {
          100: "#F2F3F7",
          200: "#E7E9F0",
          400: "#B4B9CC",
          500: "#8D93A8",
        },
        keyword: {
          DEFAULT: "#7C9CFF",
          soft: "#4E6AC4",
        },
        string: {
          DEFAULT: "#8FD9A8",
          soft: "#5FA878",
        },
        tag: {
          DEFAULT: "#E8A87C",
          soft: "#C4835A",
        },
        rose: {
          DEFAULT: "#E88DA0",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(124,156,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(124,156,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
