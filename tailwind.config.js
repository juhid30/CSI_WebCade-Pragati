export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'white':'#DEFFF8',
      'purple':'#B23B7B',
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
