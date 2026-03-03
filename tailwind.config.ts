import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#22d3ee',
          600: '#0891b2'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
