/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8ed',
          100: '#ffefd1',
          200: '#ffdca3',
          300: '#ffc26a',
          400: '#ff9f2e',
          500: '#ff8008',
          600: '#f26200',
          700: '#c94800',
          800: '#9f3a09',
          900: '#82310e',
        },
        maroon: {
          500: '#8b1e2b',
          600: '#701823',
          700: '#5a131c',
        },
        gold: {
          400: '#f2c14e',
          500: '#e5a729',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(194, 65, 12, 0.35)',
        glow: '0 0 40px rgba(255, 160, 0, 0.35)',
      },
      backgroundImage: {
        'festival-gradient': 'linear-gradient(135deg, #ff8008 0%, #ff6a00 45%, #c94800 100%)',
        'gold-gradient': 'linear-gradient(135deg, #f2c14e 0%, #e5a729 100%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
