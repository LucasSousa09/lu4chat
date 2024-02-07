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
        primary: '#1078C2',
        secondary: '#083D64',
        overlay: 'rgba(0,0,0,0.5)'
      },
      borderWidth: {
        '1.5': '1.5px'
      },
      maxWidth: {
        'desktop': '1440px'
      },
      textShadow: {
        light: '2px 2px 3px rgba(16, 120, 194, .5)',
        heavy: '4px 2px 0px rgba(16, 120, 194, 1), 0px 2px 0px rgba(16, 120, 194, 1)'
      },
      boxShadow: {
        'chat-options':  '0 0px 5px 1px rgba(16, 120, 194, 0.4)'
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
export default config;
