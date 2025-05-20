/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		sm: '480px',
  		md: '768px',
  		lg: '976px',
  		xl: '1440px'
  	},
  	fontFamily: {
  		sans: [
  			'Graphik',
  			'sans-serif'
  		],
  		serif: [
  			'Merriweather',
  			'serif'
  		]
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			warning: 'var(--color-warning)',
  			error: 'var(--color-error)',
  			success: 'var(--color-success)',
  			info: 'var(--color-info)',
  			background: 'hsl(var(--background))',
  			text: 'var(--color-text)',
  			'text-secondary': 'var(--color-text-secondary)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			card_border: 'var(--color-border)',
  			heading_color: 'var(--color-heading)',
  			text_color: 'var(--color-text)',
  			bg_color: 'var(--color-bg)',
  			hover_colorL: 'var(--color-hover)',
  			card_bg_color: 'var(--color-card-bg)',
  			btn_color: 'var(--color-btn)',
  			btn_hover_color: 'var(--color-btn-hover)',
  			black: 'var(--color-black)',
  			btn_text_color: 'var(--color-btn-text)',
  			header_bg: 'var(--color-header-bg)',
  			header_text: 'var(--color-header-text)',
  			footer_bg: 'var(--color-footer-bg)',
  			footer_text: 'var(--color-footer-text)',
  			foreground: 'hsl(var(--foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					p: {
  						color: 'var(--color-paragraph)',
  						lineHeight: '1.75',
  						marginBottom: '1rem'
  					},
  					h1: {
  						color: 'var(--color-heading)',
  						fontWeight: 'bold',
  						fontSize: '2.25rem',
  						marginBottom: '0.5rem'
  					},
  					h2: {
  						color: 'var(--color-heading)',
  						fontWeight: 'bold',
  						fontSize: '2.25rem',
  						marginBottom: '0.5rem'
  					},
  					h3: {
  						color: 'var(--color-heading)',
  						fontWeight: 'bold',
  						fontSize: '2.25rem',
  						marginBottom: '0.5rem'
  					},
  					h4: {
  						color: 'var(--color-heading)',
  						fontWeight: 'bold',
  						fontSize: '2.25rem',
  						marginBottom: '0.5rem'
  					},
  					strong: {
  						color: 'var(--color-strong)'
  					},
  					li: {
  						color: 'var(--color-list-item)'
  					},
  					a: {
  						color: 'var(--color-link)',
  						textDecoration: 'none',
  						'&:hover': {
  							color: 'var(--color-link-hover)'
  						}
  					},
  					blockquote: {
  						borderLeftColor: 'var(--color-blockquote-border)',
  						color: 'var(--color-blockquote-text)',
  						backgroundColor: 'var(--color-blockquote-bg)',
  						padding: '1rem',
  						margin: '1rem 0'
  					},
  					code: {
  						backgroundColor: 'var(--color-code-bg)',
  						color: 'var(--color-code-text)',
  						padding: '0.2em 0.4em',
  						borderRadius: '0.25rem'
  					},
  					pre: {
  						backgroundColor: 'var(--color-pre-bg)',
  						color: 'var(--color-pre-text)',
  						padding: '0.8em',
  						borderRadius: '0.25rem'
  					},
  					html: {
  						color: 'var(--color-html-text)',
  						backgroundColor: 'var(--color-html-bg)'
  					},
  					'*': {
  						boxSizing: 'border-box'
  					}
  				}
  			}
  		},
  		spacing: {
  			'128': '32rem',
  			'144': '36rem'
  		},
  		animation: {
  			gradient: 'gradient 10s cubic-bezier(0.4, 0, 0.2, 1) infinite'
  		},
  		keyframes: {
  			gradient: {
  				'0%, 100%': {
  					backgroundPosition: '0% 0%'
  				},
  				'50%': {
  					backgroundPosition: '100% 20%'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
