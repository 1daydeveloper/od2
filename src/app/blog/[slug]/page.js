import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PostPage = ({ frontMatter, content }) => {
  const convertToHashTags = (text) => {
    return text.split(",").map((word, index) => {
      if (word) {
        return (
          <Badge key={index} variant="secondary" className="text-lg rounded-full px-3">
            {word.trim()}
          </Badge>
        );
      }
      return null;
    });
  };
  return (
    <>
      <Card className="prose lg:prose-xl max-w-full mx-auto lg:text-lg !w-full">
        <CardHeader>
          <div className="flex flex-col gap-3 flex-wrap">
            <div className="flex flex-wrap">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {frontMatter.title}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="text-lg mb-4  w-fit">
                {frontMatter.date}
              </Badge>
              <Badge variant="outline" className="text-lg mb-4  w-fit">
                {frontMatter.author}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: marked(content),
            }}
          />
        </CardContent>
      </Card>
      <Card className="flex flex-wrap gap-3 p-5 rounded-3xl mt-6">
        <CardHeader>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Keywords
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap mb-2 gap-2">
            {convertToHashTags(frontMatter.keywords)}
          </div>
        </CardContent>
      </Card>
    </>
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
