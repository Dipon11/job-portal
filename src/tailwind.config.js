// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure this includes your source files
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 10px #9DFE00, 0 0 20px #9DFE00, 0 0 30px #14D9E5, 0 0 40px #14D9E5',
      },
      colors: {
        'rick-green': '#9DFE00',
        'rick-blue': '#14D9E5',
      },
    },
  },
  plugins: [],
};
