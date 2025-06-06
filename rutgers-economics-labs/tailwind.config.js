/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'red': {
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
        }
      },
      animation: {
        'pulse-red': 'pulse-red 2s infinite',
        'floating': 'floating 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': {
            'box-shadow': '0 0 0 0 rgba(220, 38, 38, 0.7)',
          },
          '70%': {
            'box-shadow': '0 0 0 10px rgba(220, 38, 38, 0)',
          },
        },
        'floating': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}