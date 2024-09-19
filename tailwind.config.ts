//import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        type1: {
          1: "var(--type-1-1)",
          2: "var(--type-1-2)"
        },
        type2: "#ff8822",
        bb: "#4400ee",
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
