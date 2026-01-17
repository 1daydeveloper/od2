---
title: "How to Create Dynamic Metadata in Next.js 14 and Above"
date: "2025-01-02"
author: "One Day Developers(OD2)"
authorLink: "https://www.linkedin.com/in/od2/"
category: "Web Development"
description: "Learn how to create dynamic metadata in Next.js 14 and above to improve SEO and enhance social sharing features."
keywords: "Next.js, dynamic metadata, SEO, Open Graph,title, 14, Twitter card,nextjs 14, root,layout,children, blog,slug"
urlpath: "add-metadata-dynamic-nextjs"
faqs:
  - question: "What is the difference between static and dynamic metadata in Next.js 14?"
    answer: "Static metadata is defined once and remains the same for all pages, typical for layouts. Dynamic metadata changes based on page content, like blog posts, and is generated at build or request time using the generateMetadata function."
  - question: "Can I use dynamic metadata with both App Router and Pages Router?"
    answer: "Yes, but the implementation differs. App Router (Next.js 13+) uses generateMetadata or metadata exports. Pages Router uses Head components or getServerSideProps. App Router is recommended for new projects."
  - question: "How do I handle fallback metadata when dynamic data is missing?"
    answer: "Always define a default metadata object. In your generateMetadata function, merge specific page data with this default object to ensure all pages have complete SEO tags even if some data is missing."
  - question: "Will dynamic metadata affect my site's performance?"
    answer: "Minimal impact. For static sites, it runs at build time. For server-rendered pages, it runs on request but is server-side with no client overhead. External data fetching should be cached for best performance."
  - question: "How can I test if my dynamic metadata is working correctly?"
    answer: "Inspect the page source to verify meta tags, use browser developer tools, check social media previews (Open Graph), or use Google's Rich Results Test tool." 
---


When building modern web applications, one of the most important aspects to consider is **SEO (Search Engine Optimization)**. Dynamic metadata plays a vital role in improving SEO by ensuring that each page has the correct title, description, and other meta tags like Open Graph and Twitter cards. In this article, we will show you how to implement dynamic metadata generation in **Next.js 14** and above.

## What is Dynamic Metadata?

Dynamic metadata refers to the ability to change meta tags for each page based on its content. For example, the title, description, and social media tags for a blog post should reflect the content of that post.

In Next.js 14, we can achieve this by utilizing the **`getStaticProps`** or **`getServerSideProps`** functions and modifying the **`head`** of each page dynamically.

## Example: Dynamic Metadata in Next.js

Here’s how you can implement dynamic metadata for blog posts in a Next.js project.

### 1. Default Metadata

First, define some default metadata to fall back on in case any specific metadata is missing from a particular post.

```javascript
const defaultMetadata = {
  title: "My Blog - Technical Tutorials and Insights",
  description:
    "Welcome to my blog, where you’ll find insightful articles on web development, software engineering, and more.",
  openGraph: {
    title: "My Blog - Insights and Tutorials",
    description:
      "Explore in-depth tutorials, guides, and project solutions on web development and software engineering.",
    url: "https://myblog.com",
    images: [
      {
        url: "https://myblog.com/default-banner.jpg",
        width: 1200,
        height: 630,
        alt: "My Blog Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog - Technical Resource Hub",
    description:
      "Find technical tutorials and expert insights into web development and more on My Blog.",
    images: ["https://myblog.com/default-banner.jpg"],
  },
};
```

### **2\. Reading Blog Metadata from Markdown**

Assume that each blog post is written in Markdown format with metadata defined in the front matter. We use the `gray-matter` package to parse this metadata.
```javascript
import path from "path";  
import fs from "fs";  
import matter from "gray-matter";

export async function getData(slug) {  
  const postsDirectory \= path.join(process.cwd(), "/posts");  
  const filePath \= path.join(postsDirectory, \`${slug}.md\`);  
  const fileContent \= fs.readFileSync(filePath, "utf8");

  const { data, content } \= matter(fileContent);

  return {  
    frontMatter: data,  
    content,  
  };  
}
```

### **3\. Generating Dynamic Metadata**

We then generate the dynamic metadata by merging the front matter from the blog post with the default metadata.
```javascript
export function generateMetadata({ params }) {  
  const { slug } \= params;  
  return getData(slug).then(({ frontMatter }) \=\> {  
    const { title, description, keywords } \= frontMatter;

    return {  
      ...defaultMetadata,  
      title: title || defaultMetadata.title,  
      description: description || defaultMetadata.description,  
      keywords: keywords || defaultMetadata.keywords,  
      openGraph: {  
        ...defaultMetadata.openGraph,  
        title: title || defaultMetadata.openGraph.title,  
        description: description || defaultMetadata.openGraph.description,  
        url: \`https://myblog.com/blog/${slug}\`,  
      },  
      twitter: {  
        ...defaultMetadata.twitter,  
        title: title || defaultMetadata.twitter.title,  
        description: description || defaultMetadata.twitter.description,  
      },  
    };  
  });  
}
```
### **4\. Page Component**

Finally, create a page component that will render the blog content and metadata.
```javascript
export default async function Page({ params, children }) {  
  return \<div className="p-5"\>{children}\</div\>;  
}
```
## **Example Blog Post Content**

Let’s now look at an example blog post in markdown format, which will be processed dynamically by the code above.

\---  
title: "Introduction to Next.js 14"  
date: "2025-01-01"  
author: "John Doe"  
category: "Web Development"  
description: "A beginner’s guide to Next.js 14 and its new features."  
keywords: "Next.js, React, Web Development"  
\---

\#\# Introduction to Next.js 14

Next.js 14 is a powerful React framework that allows you to build static websites, dynamic web apps, and server-rendered applications. In this blog post, we will go over the basics of Next.js 14, including its new features and how to get started with it.

\#\#\# New Features in Next.js 14

\- \*\*Improved Image Optimization\*\*: Next.js 14 comes with better built-in image optimization support, reducing the complexity of serving images.  
\- \*\*Automatic Static Optimization\*\*: Pages are automatically optimized for static rendering, which results in faster load times.

For more information on how to use Next.js, be sure to check out the \[Next.js Documentation\](https://nextjs.org/docs).

## **Conclusion**

By implementing dynamic metadata generation, you ensure that each page of your website has personalized and SEO-friendly meta tags. This approach is particularly useful for content-heavy websites like blogs, where each post needs its unique title, description, and social media sharing settings.

In Next.js 14, this is easily achievable by reading metadata from markdown files and using that data to dynamically populate the page’s `<head>` tag.

With dynamic metadata, you can:

* Improve SEO by providing unique meta tags for each page  
* Enhance social media sharing with Open Graph and Twitter cards  
* Ensure content pages are properly indexed and shared across platforms

This markdown file explains how to generate dynamic metadata for blog posts using Next.js 14, with example content for the blog post and metadata configuration.
