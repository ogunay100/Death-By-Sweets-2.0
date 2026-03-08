/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: '#F5E6D3',
        skull: '#E8D5BF',
        blush: '#F5A0C0',
        hotpink: '#FF69B4',
        rosegold: '#C4917B',
        darkrose: '#8B2252',
        midnight: '#0D0A0E',
        abyss: '#130F15',
        crypt: '#1A1520',
        tomb: '#211B28',
        violet: '#2A1F33',
      },
      fontFamily: {
        display: ['"Creepster"', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        drift: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        }
      }
    },
  },
  plugins: [],
}
