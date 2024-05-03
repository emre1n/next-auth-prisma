import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.zinc[800],
        secondary: colors.zinc[100],
        error: colors.red[500],
        warning: colors.yellow[500],
        success: colors.green[500],
        info: colors.blue[500],
        accent: colors.blue[500],
        neutral: colors.gray[500],
        'base-100': colors.white,
      },
    },
  },
  plugins: [],
};

export default config;
