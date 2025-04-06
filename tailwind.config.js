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
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        button: '0 4px 6px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 6px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}