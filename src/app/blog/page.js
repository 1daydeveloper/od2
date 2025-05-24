import { getSortedPostsData } from "@main/lib/posts";
import BlogListClient from "./BlogListClient";

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  return <BlogListClient allPostsData={allPostsData} />;
}
