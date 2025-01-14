import { getSortedPostsData } from "@main/lib/posts";
import Link from "next/link";

export default async function BlogPage() {
  const allPostsData = getSortedPostsData();
  const convertToHashTags = (text) => {
    return text.split(",").map((word, index) => {
      // Check if the word starts with "#" and turn it into a link
      if (word) {
        return (
          <div key={index} className="text-lg  rounded-full  px-3 bg-white ">
            #{word}
          </div>
        );
      }
      return word + " ";
    });
  };
  return (
    <>
      <h1 className="text-2x font-extrabold mb-4 text-center">
        OD2 LATEST BLOGS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
        {allPostsData.map(
          ({ id, title, date, author, keywords, category, description }) => (
            <Link
              href={`/blog/${id}`}
              key={id}
              className="border rounded-lg p-4 hover:scale-105 transition-transform duration-200 bg-gray-900"
            >
              <div className="flex justify-between">
                <div>
                  {" "}
                  <h2 className="text-2xl font-extrabold text-white sm:text-3xl mb-2">
                    {title}
                  </h2>
                </div>
                <div> </div>
              </div>

              <div className="flex flex-wrap mb-3 text-black font-bold gap-2">
                <div className="text-lg  rounded-md px-3 bg-orange-500">
                  <span className="font-extrabold">Publish Date:</span>
                  {date}
                </div>
                <div className="text-lg rounded-md px-3 bg-white">
                  <span className="font-extrabold">Author:</span> {author}
                </div>
                <div className="text-lg rounded-md px-3 bg-orange-500">
                  <span className="font-extrabold">Catagory:</span> {category}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <p className="text-base line-clamp-3">{description}</p>
                {/* <div className="flex flex-wrap mb-2 text-black gap-2 line-clamp-2">
                    {convertToHashTags(keywords)}
                  </div> */}
              </div>
              <button className="flex mt-2  text font-extrabold w-fit text-black  bg-white p-2 rounded-xl self-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                    clipRule="evenodd"
                  />
                </svg>{" "}
                <span className="self-center">Read This Blog</span>
              </button>
            </Link>
          )
        )}
      </div>
    </>
  );
}
