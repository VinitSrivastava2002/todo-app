/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      colors: {
        brand: { DEFAULT: '#4361EE', soft: '#DDE3FF', navy: '#26389B' },
        canvas: '#FAFAFF',
        ink: '#111322',
      },
    },
  },
  plugins: [],
}
