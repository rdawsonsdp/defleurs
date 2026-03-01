import type { Config } from "tailwindcss";
import relumeTailwindPreset from "@relume_io/relume-tailwind";

const config: Config = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Playfair Display"', 'Georgia', 'serif'],
        didot: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  presets: [relumeTailwindPreset]
};
export default config;
