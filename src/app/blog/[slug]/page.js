import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import PostPageClient from "./PostPageClient";

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "/posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

// Fetch all posts data for related blogs
export async function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      id: filename.replace(".md", ""),
      ...data,
    };
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Fetch post data based on slug
export async function getData(slug) {
  const postsDirectory = path.join(process.cwd(), "/posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  return {
    frontMatter: data,
    content: marked(content),
  };
}

// Generate metadata for the blog post
export async function generateMetadata({ params }) {
  const { slug } = params;
  const { frontMatter } = await getData(slug);

  if (!frontMatter) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: frontMatter.keywords,
    authors: [{ name: frontMatter.author, url: frontMatter.authorLink }],
    category: frontMatter.category,
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
      title: frontMatter.title,
      description: frontMatter.description,
      url: `https://www.od2.in/blog/${slug}`,
      siteName: 'OD2 Blog',
      type: "article",
      publishedTime: frontMatter.date,
      authors: [frontMatter.author],
      section: frontMatter.category,
      tags: frontMatter.keywords?.split(",").map((k) => k.trim()),
      images: [
        {
          url: frontMatter.image || `https://www.od2.in/api/og?title=${encodeURIComponent(frontMatter.title)}`,
          width: 1200,
          height: 630,
          alt: frontMatter.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.description,
      creator: frontMatter.author,
      images: [frontMatter.image || `https://www.od2.in/api/og?title=${encodeURIComponent(frontMatter.title)}`],
    },
    alternates: {
      canonical: `https://www.od2.in/blog/${slug}`,
    },
  };
}

// Page Component
export default async function Page({ params }) {
  const { slug } = params;
  const { frontMatter, content } = await getData(slug);
  const allPosts = await getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontMatter.title,
    description: frontMatter.description,
    author: {
      "@type": "Person",
      name: frontMatter.author,
      url: frontMatter.authorLink,
    },
    publisher: {
      "@type": "Organization",
      name: "OD2 - One Day Developers",
      url: "https://www.od2.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.od2.in/odd.png"
      }
    },
    datePublished: frontMatter.date,
    dateModified: frontMatter.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.od2.in/blog/${slug}`
    },
    image: {
      "@type": "ImageObject",
      url: frontMatter.image || `https://www.od2.in/api/og?title=${encodeURIComponent(frontMatter.title)}`,
      width: 1200,
      height: 630
    },
    articleSection: frontMatter.category,
    keywords: frontMatter.keywords,
    url: `https://www.od2.in/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostPageClient frontMatter={frontMatter} content={content} slug={slug} allPosts={allPosts} />
    </>
  );
}
