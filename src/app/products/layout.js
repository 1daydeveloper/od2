export const metadata = {
  title:
    "Best Web Development Tools: Next.js, Tailwind CSS, MongoDB, Auth0 & More",
  description:
    "Explore the best web development tools and technologies for modern applications. Learn how Next.js, Tailwind CSS, MongoDB, Auth0, and Vercel can enhance your development workflow, improve performance, and simplify deployment. ",
  openGraph: {
    title:
      "Best Web Development Tools: Next.js, Tailwind CSS, MongoDB, Auth0 & More",
    description:
      "Explore the best web development tools and technologies for modern applications. Learn how Next.js, Tailwind CSS, MongoDB, Auth0, and Vercel can enhance your development workflow, improve performance, and simplify deployment. ",
  },
  keywords:"web development tools, Next.js, Tailwind CSS, MongoDB, Auth0, Vercel, frontend development, backend development, Free, od2 ,od2.in, One Day Developers, One Day Developers 2, One Day Developers Team, One Day Developers 2 Team, One Day Developers Team 2, One Day Developers 2 Team 2, One Day Developers Team Two, One Day Developers 2 Team Two, One Day Developers Team 2, One Day Developers 2 Team 2, One Day Developers Team Two, One Day Developers 2 Team Two, One Day Developers Team 2, One Day Developers 2 Team 2, One Day Developers Team Two, One Day Developers 2 Team Two, One Day Developers Team 2, One Day Developers 2 Team 2, One Day Developers Team Two, One Day Developers 2 Team Two, One Day Developers Team 2, One Day Developers 2 Team 2, One Day Developers Team Two, One Day Developers 2 Team Two, One Day Developers Team 2, One Day Developers 2 Team 2, One Day Developers Team Two, One Day Developers 2 Team Two",
};

export default function Products({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OD2 - One Day Developers",
              "url": "https://od2.in",
              "logo": "https://www.od2.in/odd.png",
              "sameAs": [
                "https://www.instagram.com/onedaydevelopers/",
                "https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA",
                "https://x.com/onedaydev2020"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "admin@od2.in",
                "telephone": "+91$$$$$$$$$$",
                "contactType": "customer service"
              },
              "foundingDate": "2020",
              "description": "OD2 - One Day Developers specializes in web, app, and software development with high performance and SEO optimization.",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Temp Mail",
                      "description": "Generate disposable emails on-the-go! Secure, fast, and perfect for protecting your privacy or testing software."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Passport Size Photo Maker",
                      "description": "Get your passport-size photo perfectly resized and ready for print. Quick, easy, and high-quality images for all your official document needs."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Broken Link Checker",
                      "description": "Easily check your website for broken links and ensure all your links are working correctly. Quick, efficient, and reliable link checking for your web pages."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Software Development",
                      "description": "Custom software solutions tailored to your needs.",
                      "url": "https://www.od2.in/products"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "OD2 Billing System",
                      "description": "A fast and efficient billing system for businesses with low price.",
                      "url": "https://www.od2.in/products/od2-billing-system",
                      "image": "https://www.od2.in/odd.png",
                      "brand": {
                        "@type": "Brand",
                        "name": "OD2"
                      },
                      "offers": {
                        "@type": "Offer",
                        "priceCurrency": "INR",
                        "price": "9999.00",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  }
                ]
              }
            },
            null,
            2
          )
        }}
      />
      {children}
    </>
  );
}
