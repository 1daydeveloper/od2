import path from "path";
import fs from "fs";
import matter from "gray-matter";

const defaultMetadata = {
  title: "OD2dd Blog - Technical Tutorials and Insights",
  description:
    "Welcome to OD2 Blog, your go-to resource for technical tutorials, quick solutions, and expert insights on software development, desktop applications, Android development, and more.",
  openGraph: {
    title: "OD2 Blog - Technical Tutorials and Insights",
    description:
      "Discover in-depth tutorials, guides, and project solutions from OD2 Blog. Specializing in software development and delivering quality content for developers.",
    url: "https://www.od2.in/blog",
    images: [
      {
        url: "https://www.od2.in/odd.png",
        width: 1200,
        height: 630,
        alt: "OD2 Blog Banner - Technical Tutorials and Insights",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OD2 Blog - Your Technical Resource Hub",
    description:
      "Get the latest tutorials, quick solutions, and expert advice on software development from OD2 Blog.",
    images: ["https://www.od2.in/odd.png"],
  },
};
export async function getData(slug) {
  const postsDirectory = path.join(process.cwd(), "/posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  return {
    frontMatter: data,
    content,
  };
}

export function generateMetadata({ params }) {
  const { slug } = params;
  return getData(slug).then(({ frontMatter }) => {
    const { title, description, keywords, author, category, date } = frontMatter;

    return {
      ...defaultMetadata,
      title: title || defaultMetadata.title,
      description: description || defaultMetadata.description,
      keywords: keywords || defaultMetadata.keywords,
      authors: [{ name: author, url: frontMatter.authorLink }],
      category: category,
      canonical: `https://www.od2.in/blog/${slug}`,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        ...defaultMetadata.openGraph,
        title: title || defaultMetadata.openGraph.title,
        description: description || defaultMetadata.openGraph.description,
        url: `https://www.od2.in/blog/${slug}`,
        type: 'article',
        publishedTime: date,
        authors: [author],
        section: category,
        tags: keywords?.split(',').map(k => k.trim()),
      },
      twitter: {
        ...defaultMetadata.twitter,
        title: title || defaultMetadata.twitter.title,
        description: description || defaultMetadata.twitter.description,
        creator: author,
      },
      alternates: {
        canonical: `https://www.od2.in/blog/${slug}`,
      },
    };
  });
}

// Layout Component
export default async function Layout({ params, children }) {
  const { slug } = params;
  const { frontMatter } = await getData(slug);
  
  // Use FAQs from frontmatter for the schema
  const faqs = frontMatter?.faqs || [];
  
  // Generate FAQ Schema in Schema.org format
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, '').trim() // Clean HTML tags if any
      }
    }))
  } : null;

  return (
    <div className="blog-content-wrapper">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema, null, 2)
          }}
        />
      )}
      {children}
    </div>
  );
}
