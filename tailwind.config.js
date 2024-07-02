/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
    heading_color:"#f7ebdc",
    text_color:"#e8c396",
    bg_color:"#231608",
    hover_colorL:"#ae7026",
    card_bg_color:"#694317",
    btn_color:"#d99b51",
    btn_hover_color:"#e8c396",
    btn_text_color:"#694317",
    bg_color:"#231608",}
  },
  plugins: [],
};
