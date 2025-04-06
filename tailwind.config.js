// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF9800',
          DEFAULT: '#FF8C00',
          dark: '#FF7000',
        },
        secondary: {
          light: '#4CAF50',
          DEFAULT: '#43A047',
          dark: '#388E3C',
        },
        accent: {
          light: '#9C27B0',
          DEFAULT: '#8E24AA',
          dark: '#7B1FA2',
        },
        background: '#F9F9F9',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Fredoka One', 'cursive'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.08)',
        button: '0 2px 4px rgba(0, 0, 0, 0.08)',
        'button-hover': '0 4px 8px rgba(0, 0, 0, 0.12)',
        nav: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'screen-90': '90vh',
      },
      zIndex: {
        '-10': '-10',
        '60': '60',
        '70': '70',
        'auto': 'auto',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333333',
            a: {
              color: '#FF8C00',
              '&:hover': {
                color: '#FF7000',
              },
            },
            h1: {
              fontFamily: 'Fredoka One, cursive',
              fontWeight: '500',
            },
            h2: {
              fontFamily: 'Fredoka One, cursive',
              fontWeight: '500',
            },
            h3: {
              fontFamily: 'Fredoka One, cursive',
              fontWeight: '500',
            },
            h4: {
              fontFamily: 'Fredoka One, cursive',
              fontWeight: '500',
            },
          },
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      textColor: ['active', 'disabled'],
      borderColor: ['active', 'disabled'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      scale: ['group-hover'],
      transform: ['group-hover'],
    },
  },
  plugins: [],
}