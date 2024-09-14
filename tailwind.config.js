module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path based on your project structure
  ],
  theme: {
    extend: {},
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'white':'#DEFFF8',
      'purple':'#B23B7B',
    }
  },
  plugins: [
    // require('daisyui')
  ],
}
