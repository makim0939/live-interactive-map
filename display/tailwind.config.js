/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        textblack: '#252528',
        textgray: '#555558',
        textlightgray: '#757578',
        bgwhite: '#f5f5f2',
        borderlightgray: '#d5d5d8',
      },
    },
  },
  plugins: [],
};
