/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Topic: Configuration Tailwind: Custom Font Family
    // NOTE Override Tailwind default
    fontFamily: {
      // 1) Font from Google fonts
      // 2) Put font here
      // 3) Place in className (ex. Header.jsx)
      // pizza: 'Roboto Mono, monospace',
      sans: 'Roboto Mono, monospace',
    },
    // NOTE Adding in extend, not override the default
    extend: {
      colors: {
        pizza: '#123456',
      },
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }],
      },
      height: {
        // 100vh not support mobile browser
        // Dynamic Viewport Height Unit (for any device)
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
