export default function BlogLayout({ children, frontMatter, content }) {
  return (
    <>
      {" "}
      <div className="p-3">{children}</div>
      <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 my-8 rounded-lg shadow-lg">
        <div className="max-w-screen-lg mx-auto text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Share Your Knowledge? Publish Your Blog Today!
          </h2>
          <p className="text-lg mb-6">
            Writing blog posts on technical topics helps you grow your audience,
            improves SEO, and contributes to the developer community. Share your
            experience with us!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/blog/od2-blog-submission-guidelines"
              className="px-6 py-2 text-lg font-medium text-indigo-600 bg-white rounded-md shadow-md hover:bg-indigo-100 transition-all"
            >
              View Guidelines
            </a>
            <a
              target="blank"
              href="https://forms.gle/DatwRJyuUAJvCcw67"
              className="px-6 py-2 text-lg font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 transition-all"
            >
              Submit Your Blog
            </a>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-lg bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white">
        <div className="flex flex-row flex-wrap w-full gap-5 justify-center items-center p-5">
          <div className="my-auto text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check-circle"
              width="50"
              height="50"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
          </div>
          <div>
            <div className="font-bold text-lg">
              Get Notification on New Latest Blogs
            </div>
            <div className="text-base">
              <button className="bg-black hover:bg-blue-700 justify-center flex gap-1 font-extrabold p-3 rounded-md transition-all">
                Subscribe For Free
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="maincard mt-2">
        <div className="card mt-4 border-4 border-white shadow-xl shadow-yellow-600/100 p-4 md:p-10 flex flex-col items-center justify-center text-center">
          <p className="text-xl md:text-2xl font-bold border-b-4 border-b-black">
            Stay in Touch With Us
          </p>
          <ul className="flex flex-row items-center justify-center text-center mt-5">
            <li className="mx-2">
              <a
                href="https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA"
                target="_blank"
                aria-label="Share on Youtube"
              >
                <svg
                  className="w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li className="mx-2">
              <a
                href="https://www.instagram.com/onedaydevelopers/"
                target="_blank"
                aria-label="Share on Instagram"
              >
                <svg
                  className="w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
export const metadata = {
  title: "OD2 Blog - Technical Tutorials and Insights",
  description:
    "Welcome to OD2 Blog, your go-to resource for technical tutorials, quick solutions, and expert insights on software development, desktop applications, Android development, and more.",
  openGraph: {
    title: "OD2 Blog - Technical Tutorials and Insights",
    description:
      "Discover in-depth tutorials, guides, and project solutions from OD2 Blog. Specializing in software development and delivering quality content for developers.",
    url: "https://www.od2.in/blog",
    images: [
      {
        url: "https://www.od2.in/odd.png",
        width: 1200,
        height: 630,
        alt: "OD2 Blog Banner - Technical Tutorials and Insights",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OD2 Blog - Your Technical Resource Hub",
    description:
      "Get the latest tutorials, quick solutions, and expert advice on software development from OD2 Blog.",
    images: ["https://www.od2.in/odd.png"],
  },
};
