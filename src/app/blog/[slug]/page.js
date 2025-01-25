import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const PostPage = ({ frontMatter, content }) => {
  const convertToHashTags = (text) => {
    return text.split(",").map((word, index) => {
      // Check if the word starts with "#" and turn it into a link
      if (word) {
        return (
          <div key={index} className="text-lg  rounded-full  px-3 ">
            {word}
          </div>
        );
      }
      return word + " ";
    });
  };
  return (
    <>
      <article className="prose lg:prose-xl max-w-full mx-auto lg:text-lg  !w-full ">
        <div className="flex flex-col gap-3 flex-wrap ">
          <div className="flex flex-wrap">
            <h1>{frontMatter.title}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="text-lg mb-4 rounded-full  px-3 bg-yellow-500 text-black w-fit">
              {frontMatter.date}
            </div>
            <div className="text-lg mb-4 rounded-full  px-3 bg-purple-500 text-black w-fit">
              {frontMatter.author}
            </div>
          </div>
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: marked(content),
          }}
        />
      </article>
      <div className=" card flex flex-wrap gap-3 p-5 rounded-3xl">
        <h3 className="text-2xl font-bold">Keywords</h3>
        <div className="flex flex-wrap  mb-2  gap-2">
          {convertToHashTags(frontMatter.keywords)}
        </div>
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
