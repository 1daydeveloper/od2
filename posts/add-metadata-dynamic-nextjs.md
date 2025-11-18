---
title: "How to Create Dynamic Metadata in Next.js 14 and Above"
date: "2025-01-02"
author: "One Day Developers(OD2)"
authorLink: "https://www.linkedin.com/in/od2/"
category: "Web Development"
description: "Learn how to create dynamic metadata in Next.js 14 and above to improve SEO and enhance social sharing features."
keywords: "Next.js, dynamic metadata, SEO, Open Graph,title, 14, Twitter card,nextjs 14, root,layout,children, blog,slug"
urlpath: "add-metadata-dynamic-nextjs" 
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

## Frequently Asked Questions (FAQs)

### Q1: What is the difference between static and dynamic metadata in Next.js 14?

A: Static metadata is defined once and remains the same for all pages, typically in your layout.js file. Dynamic metadata changes based on the page content, such as blog posts where each post has unique title, description, and social media tags. Dynamic metadata is generated at build time or request time based on the specific data for each page.

### Q2: Can I use dynamic metadata with both App Router and Pages Router in Next.js?

A: Yes, but the implementation differs. In the App Router (Next.js 13+), you use the `generateMetadata` function or export metadata objects directly from page components. In the Pages Router, you would use `Head` components or `getStaticProps`/`getServerSideProps` to populate meta tags. The App Router approach is recommended for new projects.

### Q3: How do I handle fallback metadata when dynamic data is missing?

A: Always define default metadata that acts as a fallback. In your `generateMetadata` function, check if the required data exists and merge it with default values. This ensures your pages always have proper SEO tags even if specific post data is incomplete or unavailable.

### Q4: Will dynamic metadata affect my site's performance?

A: Dynamic metadata generation typically has minimal performance impact since it's processed during the build phase for static sites or at request time for server-rendered pages. The metadata generation happens on the server, so there's no additional client-side JavaScript execution. However, if you're fetching external data for metadata, consider caching strategies.

### Q5: How can I test if my dynamic metadata is working correctly?

A: You can test dynamic metadata in several ways: inspect the page source to verify meta tags are populated correctly, use browser developer tools to check the `<head>` section, test social media sharing to see if Open Graph data displays properly, or use SEO tools like Google's Rich Results Test to validate your structured data.

