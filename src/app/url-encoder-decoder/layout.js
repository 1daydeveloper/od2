export const metadata = {
    title: "URL Encoder Decoder - Free Online Web Tool",
    description: "Free online URL encoder and decoder. Instantly convert URLs with real-time preview of both encoded and decoded versions. Essential tool for web developers.",
    keywords: [
        "URL encoder",
        "URL decoder",
        "percent encoding",
        "encodeURIComponent",
        "decodeURIComponent",
        "URL encoding tool",
        "free online developer tools",
        "OD2",
    ],
    alternates: {
        canonical: "/url-encoder-decoder",
    },
    openGraph: {
        title: "URL Encoder Decoder - Free Online Tool | OD2",
        description: "Instantly encode or decode URLs with real-time feedback. Fast, free, and secure developer tool.",
        url: "/url-encoder-decoder",
        siteName: "OD2 Tools",
        images: [
            {
                url: "/odd.png",
                width: 1200,
                height: 630,
                alt: "OD2 URL Encoder Decoder",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "URL Encoder Decoder - Free Online Tool | OD2",
        description: "Free online URL encoder and decoder tool with simultaneous results.",
        images: ["/odd.png"],
    },
};

import FaqSection from "@/components/FaqSection";
import faqData from "@/data/faqs.json";

export default function URLEncoderDecoderLayout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": "https://www.od2.in/url-encoder-decoder/#software",
        "name": "OD2 URL Encoder Decoder",
        "description": "Free online URL encoder and decoder tool for web developers.",
        "url": "https://www.od2.in/url-encoder-decoder",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "author": {
            "@type": "Organization",
            "name": "One Day Developers (OD2)",
            "url": "https://www.od2.in"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {children}
            <div className="mt-12">
                <FaqSection faqs={faqData["url-encoder-decoder"]} description="Common questions about URL encoding and decoding." />
            </div>
        </>
    );
}
