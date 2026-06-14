/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#3b0a0a',
          light: '#5c1111',
          dark: '#1a0404',
          deep: '#0d0202',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#e8c94a',
          dark: '#a88a1c',
          pale: '#f0e0a0',
        },
        sandal: {
          DEFAULT: '#f5e6c8',
          dark: '#e8d0a0',
          light: '#fdf5e8',
        },
        sacred: {
          smoke: 'rgba(212, 175, 55, 0.08)',
          glow: 'rgba(212, 175, 55, 0.25)',
          overlay: 'rgba(10, 2, 2, 0.75)',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'flame': 'flame 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'smoke-rise': 'smokeRise 8s ease-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scaleY(1) scaleX(1)', opacity: 1 },
          '100%': { transform: 'scaleY(1.1) scaleX(0.95)', opacity: 0.9 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(212, 175, 55, 0.7), 0 0 100px rgba(212, 175, 55, 0.3)' },
        },
        smokeRise: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: 0.6 },
          '100%': { transform: 'translateY(-200px) scaleX(3)', opacity: 0 },
        },
        flicker: {
          '0%': { opacity: 0.9 },
          '50%': { opacity: 0.6 },
          '100%': { opacity: 1.0 },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f0e0a0 50%, #d4af37 100%)',
        'maroon-gradient': 'linear-gradient(180deg, #0d0202 0%, #3b0a0a 50%, #1a0404 100%)',
        'divine-gradient': 'linear-gradient(180deg, #0d0202 0%, #1a0404 30%, #2a0808 60%, #0d0202 100%)',
      },
    },
  },
  plugins: [],
}
