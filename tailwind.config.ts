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
        'roxo': 'rgba(144, 21, 155, 0.77)',
        'azul': 'rgba(73, 162, 244, 0)',
        'verde': '#055965',
        'roxo2': 'rgba(42, 10, 62, 0.89)'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'gradient-angular': 'linear-gradient(from 180deg, roxo2, verde)'
      },
    },
  },
  plugins: [],
};
export default config;
