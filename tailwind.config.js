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
      typography: {
        DEFAULT: {
          css: {
            // Paragraph styling
            p: {
              color: "#E5E7EB", // Light gray text for paragraphs
              backgroundColor: "#1F2937", // Dark background for paragraphs
              lineHeight: "1.75", // Improved line height for readability
              marginBottom: "1rem", // Space between paragraphs
            },

            // Heading 1 styling
            h1: {
              color: "#F3F4F6", // Light color for h1 heading
              backgroundColor: "#1F2937", // Dark background for h1
              fontWeight: "bold", // Bold heading text
              fontSize: "2.25rem", // Adjusted font size for h1
              marginBottom: "0.5rem", // Spacing below the heading
            },
            h2: {
              color: "#F3F4F6", // Light color for h1 heading
              backgroundColor: "#1F2937", // Dark background for h1
              fontWeight: "bold", // Bold heading text
              fontSize: "2.25rem", // Adjusted font size for h1
              marginBottom: "0.5rem", // Spacing below the heading
            },
            h3: {
              color: "#F3F4F6", // Light color for h1 heading
              backgroundColor: "#1F2937", // Dark background for h1
              fontWeight: "bold", // Bold heading text
              fontSize: "2.25rem", // Adjusted font size for h1
              marginBottom: "0.5rem", // Spacing below the heading
            },
            h4: {
              color: "#F3F4F6", // Light color for h1 heading
              backgroundColor: "#1F2937", // Dark background for h1
              fontWeight: "bold", // Bold heading text
              fontSize: "2.25rem", // Adjusted font size for h1
              marginBottom: "0.5rem", // Spacing below the heading
            },
            strong: {
              color: "#d99b51", // Light color for h1 heading
            },
            li: {
              color: "#E5E7EB", // Light gray text for paragraphs
            },

            // Link styling
            a: {
              color: "#93C7FF", // Light blue for links
              textDecoration: "none", // Remove underlines from links
              "&:hover": {
                color: "#7FB6F7", // Darker blue on hover
              },
            },

            // Blockquote styling
            blockquote: {
              borderLeftColor: "#4F46E5", // Light purple border for blockquotes
              color: "#D1D5DB", // Light gray text for blockquotes
              backgroundColor: "#2D3748", // Dark background for blockquote
              padding: "1rem", // Padding inside blockquotes
              margin: "1rem 0", // Margin for spacing around blockquotes
            },

            // Code styling
            code: {
              backgroundColor: "#2D3748", // Dark background for code
              color: "#E5E7EB", // Light color for code text
              padding: "0.2em 0.4em", // Padding inside code blocks
              borderRadius: "0.25rem", // Rounded corners for code blocks
            },

            // General text for all elements
            html: {
              color: "#E5E7EB", // Light gray text color for all content
              backgroundColor: "#1F2937", // Dark background for the entire page
            },

            // General font styling (applied to all elements)
            "*": {
              fontFamily: '"Roboto", sans-serif', // Consistent font across the site
              boxSizing: "border-box", // Box-sizing for consistent sizing
            },
          },
        },
      },

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
  plugins: [require("@tailwindcss/typography")],
};
