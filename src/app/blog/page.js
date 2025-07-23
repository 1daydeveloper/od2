import { getSortedPostsData } from "@main/lib/posts";
import BlogListClient from "./BlogListClient";
import BlogListSkeleton from "@/components/ui/blog-list-skeleton";
import { Suspense } from "react";

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogListClient allPostsData={allPostsData} />
    </Suspense>
  );
}
