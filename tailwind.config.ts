import type { Config } from "tailwindcss";
import { Nunito } from '@next/font/google';

const config: Config = {
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
      },
      fontFamily: {
        nunito: ['Nunito',],
      },
      boxShadow: {
        neon: "0 0 80px theme('colors.green.300'), 0 0 20px theme('colors.green.400')"
      }
    },
  },
  plugins: [],
};
export default config;
