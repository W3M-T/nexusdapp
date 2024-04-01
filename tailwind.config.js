/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "primary": "#090225",
        "green-primary": "#80ff77",
        "light-green": "#00b775",
      },
      colors: {
        "primary": "#1d4ed8",
        "green-primary": "#80ff77",
        "grey-primary": "#24232c",
        "grey-solid": "#1d1e23",
        "bg-primary2": "rgb(17, 10, 43)",
        "bg-primary": "rgb(28, 15, 58)",
        "blue-primary": "#3c91e6",
        "title-primary": "#4E4D55"

      },
      screens: {
        'sm': '640px', // Small screens
        'md': '768px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra large screens
        '2xl': '1536px', // 2x extra large screens
      },

    },
  },
  plugins: [],
}