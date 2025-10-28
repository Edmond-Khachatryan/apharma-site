import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f0',
          100: '#ccefdf',
          200: '#99dfbf',
          300: '#66cfa0',
          400: '#33bf80',
          500: '#00af60',
          600: '#008c4d',
          700: '#00693a',
          800: '#004626',
          900: '#002313',
        },
        secondary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b1ff',
          400: '#3397ff',
          500: '#007dff',
          600: '#0064cc',
          700: '#004b99',
          800: '#003266',
          900: '#001933',
        },
      },
    },
  },
  plugins: [],
};
export default config;

