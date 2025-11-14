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

// Page Component
export default async function Page({ params }) {
  const { slug } = params;
  const { frontMatter, content } = await getData(slug);
  const allPosts = await getAllPosts();

  return <PostPageClient frontMatter={frontMatter} content={content} slug={slug} allPosts={allPosts} />;
}
