/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kasavu: {
          DEFAULT: '#fdfaf3',
          dark: '#f5f0e6',
          light: '#ffffff',
        },
        backwater: {
          DEFAULT: '#1b3b36',
          light: '#2d4a22',
          dark: '#0f2420',
          deep: '#071210',
        },
        laterite: {
          DEFAULT: '#a04030',
          light: '#bd4d3a',
          dark: '#8b3a2b',
        },
        brass: {
          DEFAULT: '#c5a059',
          light: '#dcb871',
          dark: '#a88645',
          pale: '#f2e8cf',
        },
        sacred: {
          smoke: 'rgba(197, 160, 89, 0.08)',
          glow: 'rgba(197, 160, 89, 0.25)',
          overlay: 'rgba(27, 59, 54, 0.85)',
        }
      },
      fontFamily: {
        malayalam: ['"Noto Serif Malayalam"', 'serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(197, 160, 89, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(197, 160, 89, 0.35), 0 0 80px rgba(197, 160, 89, 0.15)' },
        },
      },
      backgroundImage: {
        'brass-gradient': 'linear-gradient(135deg, #a88645 0%, #dcb871 50%, #c5a059 100%)',
        'backwater-gradient': 'linear-gradient(180deg, #071210 0%, #1b3b36 50%, #0f2420 100%)',
      },
    },
  },
  plugins: [],
}
