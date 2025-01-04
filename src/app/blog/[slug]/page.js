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
          <div key={index} className="text-lg  rounded-full  px-3 bg-white ">
            {word}
          </div>
        );
      }
      return word + " ";
    });
  };
  return (
    <>
      <article className="prose prose-xl max-w-full  !w-full">
        <h2 className=" font-bold mb-4">{frontMatter.title}</h2>
        <div className="flex gap-3 flex-wrap">
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
      <div className="flex flex-wrap gap-3 bg-black p-5 rounded-3xl">
        <h3 className="text-2xl font-bold">Keywords</h3>
        <div className="flex flex-wrap  mb-2 text-black gap-2">
          {convertToHashTags(frontMatter.keywords)}
        </div>
      </div>
      <div class="mt-3 rounded-lg   uppercase bg-[#0037b6] text-[#ffffff]">
        <div class="flex flex-row flex-wrap w-full gap-5 justify-center items-center p-5 w-full h-full">
          <div class="my-auto text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-check-circle"
              width="50"
              height="50"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
          </div>
          <div>
            <div class="font-bold text-lg">
              Get Notification on New Lates Blogs
            </div>
            <div class=" text-base">
              {" "}
              <button className="bg-black hover:bg-blue-700 justify-center flex gap-1 font-extrabold p-3 rounded-md">
                Subscribe For free
              </button>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div class="mt-4 border-4 border-white shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-yellow-600/100 mx-5 p-4 md:p-10 flex flex-col items-center justify-center text-center">
          <p class="text-white text-xl md:text-2xl font-bold border-b-4 border-b-black">
            Stay Touch With Us
          </p>

          <ul class="flex flex-row items-center justify-center text-center mt-5">
            <li class="mx-2">
              <a
                href="https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA"
                target="_blank"
                aria-label="Share on Youtube"
              >
    <svg className="w-12 h-12 hover:text-red-600 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd"/>
</svg>
            </a>
            </li>

            <li class="mx-2">
              <a
                href="https://www.instagram.com/onedaydevelopers/"
                target="_blank"
                aria-label="Share on Instagram"
              >
              <svg className="w-12 h-12 hover:text-pink-600 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
</svg>

              </a>
            </li>
          </ul>
        </div>
      </section>
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
