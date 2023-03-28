/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: 'Lato, sans-serif',
        nunito: 'Nunito, sans-serif',
      },
      colors: {
        dark: '#161616',
        light: '#F8F8F8',
        darkBG: '#1E2029',
        accent: {
          100: '#5B00F0',
          200: '#9089FC',
        },
        descript: '#AEABC2',
        progress: '#F46040',
        income: '#31B447',
        outcome: '#EA3138',
      },
    },
  },
  plugins: [],
};
