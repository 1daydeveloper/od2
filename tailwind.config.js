/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },

    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      colors: {
        lightTheme: {
          bg: "#ffffff",
          text: "#000000",
          card_bg: "#f7fafc",
          btn_bg: "#d99b51",
          btn_hover_bg: "#e8c396",
          btn_text: "#694317",
        },
        darkTheme: {
          bg: "#1a202c",
          text: "#f7fafc",
        },
        headfoot_color: "#d39f63",
        heading_color: "#f7ebdc",
        text_color: "#e8c396",
        bg_color: "black",
        hover_colorL: "#ae7026",
        card_bg_color: "#694317",
        btn_color: "#d99b51",
        btn_hover_color: "#e8c396",
        black: "#000000",
        btn_text_color: "#694317",
      },
      animation: {
        gradient: "gradient 10s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 20%" },
        },
      },
    },
  },
  plugins: [],
};
