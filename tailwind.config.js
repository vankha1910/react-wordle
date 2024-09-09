/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'flip-in': {
          '0%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0)' },
        },
        'flip-out': {
          '0%': { transform: 'rotateX(0)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
      animation: {
        'flip-in': 'flip-in 0.5s ease-in-out forwards',
        'flip-out': 'flip-out 0.5s ease-in-out forwards',
      },
      colors: {
        'primary-green': '#538d4e',
        'primary-orange': '#b59f3b',
      },
    },
  },
  plugins: [],
};
