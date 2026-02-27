/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kugile': ['kugile', 'sans-serif'],
        'courier-italic': ['courier-italic', 'sans-serif'],
        'courier-regular': ['courier-regular', 'sans-serif'],
        'wasted-vindey': ['wasted-vindey', 'sans-serif']
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [],
}
