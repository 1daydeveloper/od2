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
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        info: "var(--color-info)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        card: "var(--color-card-background)",
        card_border: "var(--color-border)",
        heading_color: "var(--color-heading)",
        text_color: "var(--color-text)",
        bg_color: "var(--color-bg)",
        hover_colorL: "var(--color-hover)",
        card_bg_color: "var(--color-card-bg)",
        btn_color: "var(--color-btn)",
        btn_hover_color: "var(--color-btn-hover)",
        black: "var(--color-black)",
        btn_text_color: "var(--color-btn-text)",
        header_bg: "var(--color-header-bg)",
        header_text: "var(--color-header-text)",
        footer_bg: "var(--color-footer-bg)",
        footer_text: "var(--color-footer-text)",
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              color: "var(--color-paragraph)",
              lineHeight: "1.75",
              marginBottom: "1rem",
            },
            h1: {
              color: "var(--color-heading)",
              fontWeight: "bold",
              fontSize: "2.25rem",
              marginBottom: "0.5rem",
            },
            h2: {
              color: "var(--color-heading)",
              fontWeight: "bold",
              fontSize: "2.25rem",
              marginBottom: "0.5rem",
            },
            h3: {
              color: "var(--color-heading)",
              fontWeight: "bold",
              fontSize: "2.25rem",
              marginBottom: "0.5rem",
            },
            h4: {
              color: "var(--color-heading)",
              fontWeight: "bold",
              fontSize: "2.25rem",
              marginBottom: "0.5rem",
            },
            strong: {
              color: "var(--color-strong)",
            },
            li: {
              color: "var(--color-list-item)",
            },
            a: {
              color: "var(--color-link)",
              textDecoration: "none",
              "&:hover": {
                color: "var(--color-link-hover)",
              },
            },
            blockquote: {
              borderLeftColor: "var(--color-blockquote-border)",
              color: "var(--color-blockquote-text)",
              backgroundColor: "var(--color-blockquote-bg)",
              padding: "1rem",
              margin: "1rem 0",
            },
            code: {
              backgroundColor: "var(--color-code-bg)",
              color: "var(--color-code-text)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
            pre: {
              backgroundColor: "var(--color-pre-bg)",
              color: "var(--color-pre-text)",
              padding: "0.8em",
              borderRadius: "0.25rem",
            },
            html: {
              color: "var(--color-html-text)",
              backgroundColor: "var(--color-html-bg)",
            },
            "*": {
              fontFamily: '"Roboto", sans-serif',
              boxSizing: "border-box",
            },
          },
        },
      },

      spacing: {
        128: "32rem",
        144: "36rem",
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
  plugins: [require("@tailwindcss/typography")],
};
