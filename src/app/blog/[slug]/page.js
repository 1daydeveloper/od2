import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const PostPage = ({ frontMatter, content }) => {
  return (
    <>
      <div className="p-4">
        <article className="prose max-w-full  !w-full">
          <h2 className=" font-bold mb-4">{frontMatter.title}</h2>
          <div className="flex gap-3">
            <div className="text-lg mb-4 rounded-full  px-3 bg-white w-fit">
              {frontMatter.date}
            </div>
            <div className="text-lg mb-4 rounded-full  px-3 bg-orange-500 w-fit">
              {frontMatter.author}
            </div>
          </div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: marked(content),
            }}
          />
        </article>
      </div>
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
