/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      backgroundColor: {
          'primary': 'var(--color-bg-primary)',
          'secondary': 'var(--color-bg-secondary)',
          'tatary': 'var(--color-bg-tatary)',
          'btn-primary': 'var(--color-bg-btn-primary)',
          'btn-secondary': 'var(--color-bg-btn-secondary)',
      },
      textColor:{
        'primary': 'var(--color-text-primary)',
        'secondary': 'var(--color-text-secondary)',
      }
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}

