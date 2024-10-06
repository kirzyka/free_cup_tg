//import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",    
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: {
          DEFAULT:"var(--foreground)",
          light: "var(--foreground_light)",
          dark: "var(--foreground_dark)",
        },
        content_w: {
          DEFAULT: "var(content)",
          light: "var(--content_light)",
          dark: "var(--content_dark)",
        },
        content_b: {
          DEFAULT: "var(--content_b)",
        },
        active: "var(--active)",
        excited: "var(--excited)",
        inactive: "var(--inactive)",
        danger: "var(--danger)",
        transparent: {
          DEFAULT: 'transparent',
          100: 'rgba(0, 0, 0, 0.1)',
          200: 'rgba(0, 0, 0, 0.2)',
          300: 'rgba(0, 0, 0, 0.3)',
          400: 'rgba(0, 0, 0, 0.4)',
          500: 'rgba(0, 0, 0, 0.5)',
          600: 'rgba(0, 0, 0, 0.6)',
          700: 'rgba(0, 0, 0, 0.7)',
          800: 'rgba(0, 0, 0, 0.8)',
          900: 'rgba(0, 0, 0, 0.9)',
        },
        brown: {
          500: '#664343', // основной коричневый
          600: '#3B3030', // более темный оттенок для hover
        },
      },
    },
  },
  plugins: [],
};
export default config;
