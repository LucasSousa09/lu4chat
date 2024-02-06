import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1078C2'
      },
      borderWidth: {
        '1.5': '1.5px'
      },
      maxWidth: {
        'desktop': '1440px'
      },
      textShadow: {
        light: '2px 2px 3px rgba(16, 120, 194, .5)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
export default config;
