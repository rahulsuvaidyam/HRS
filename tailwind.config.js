/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      backgroundColor: {
          'primary': 'var(--color-bg-primary)',
          'secondary': 'var(--color-bg-secondary)',
          'tatary': 'var(--color-bg-tatary)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}

