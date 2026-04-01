/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neoYellow: "#FDE047", // playfull yellow
        neoBlue: "#3B82F6", // vibrant blue
        neoRed: "#EF4444", // vibrant red
        neoGreen: "#22C55E", // for streaks
        neoAmber: "#F59E0B", // for partial streak
      },
      boxShadow: {
        neo: "4px 4px 0px 0px rgba(0,0,0,1)",
        "neo-sm": "2px 2px 0px 0px rgba(0,0,0,1)",
        "neo-pressed": "1px 1px 0px 0px rgba(0,0,0,1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Or any bold sans you prefer
      },
    },
  },
  plugins: [],
};
