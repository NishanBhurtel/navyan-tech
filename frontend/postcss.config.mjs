/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
    theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite', // ⏳ slower spin (3s per rotation)
        'spin-slower': 'spin 6s linear infinite', // even slower
      },
    },
  },
}
export default config
