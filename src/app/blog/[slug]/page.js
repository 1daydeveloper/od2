import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

const PostPage = ({ frontMatter, content }) => {
  const convertToHashTags = (text) => {
    return text.split(",").map((word, index) => {
      if (word) {
        return (
          <Badge key={index} variant="secondary" className="text-sm sm:text-base lg:text-lg rounded-full px-2 sm:px-3 py-1">
            {word.trim()}
          </Badge>
        );
      }
      return null;
    });
  };
  return (
    <div className="w-full max-w-none">
      <Card className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none mx-auto !w-full">
        <CardHeader className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap">
              <h1 className="scroll-m-20 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
                {frontMatter.title}
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <Badge variant="outline" className="text-sm lg:text-base mb-2 sm:mb-4 w-fit">
                {frontMatter.date}
              </Badge>
              <Link href={frontMatter.authorLink ? frontMatter.authorLink : "#"} target="_blank" rel="noopener noreferrer">
                <Badge variant="outline" className="text-sm lg:text-base mb-2 sm:mb-4 w-fit flex items-center gap-1">
                  {frontMatter.authorLink && <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4" />}
                  {frontMatter.author}
                </Badge>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8">
          <div
            className="blog-post-content blog-content-wrapper prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: marked(content),
            }}
          />
        </CardContent>
      </Card>
      <Card className="flex flex-wrap gap-3 p-4 sm:p-5 lg:p-6 rounded-3xl mt-6">
        <CardHeader className="px-0 pb-2">
          <h3 className="scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight">
            Keywords
          </h3>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <div className="flex flex-wrap mb-2 gap-2">
            {convertToHashTags(frontMatter.keywords)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "/posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

// Fetch post data based on slug
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

// Page Component
export default async function Page({ params }) {
  const { slug } = params;
  const { frontMatter, content } = await getData(slug);

  return <PostPage frontMatter={frontMatter} content={content} />;
}
