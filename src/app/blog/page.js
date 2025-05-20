import { getSortedPostsData } from "@main/lib/posts";
import { BookOpenIcon } from "lucide-react";
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
              className="card border rounded-lg p-4 hover:scale-105 transition-transform duration-200"
            >
              <div className="flex justify-between">
                <div>
                  {" "}
                  <h2 className="text-2xl font-extrabold sm:text-3xl mb-2">
                    {title}
                  </h2>
                </div>
                <div> </div>
              </div>

              <div className="flex flex-wrap mb-3 font-bold gap-2">
                <div className="text-lg bg-yellow-500 text-black  rounded-md px-3">
                  <span className="font-extrabold">Publish Date:</span>
                  {date}
                </div>
                <div className="text-lg rounded-md px-3 bg-purple-600 text-black">
                  <span className="font-extrabold">Author:</span> {author}
                </div>
                <div className="text-lg rounded-md px-3 bg-white text-black">
                  <span className="font-extrabold">Catagory:</span> {category}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 ">
                <p className="text-base line-clamp-3">{description}</p>
                {/* <div className="flex flex-wrap mb-2 text-black gap-2 line-clamp-2">
                    {convertToHashTags(keywords)}
                  </div> */}
              </div>
              <button className="btn flex mt-2 gap-3 text font-extrabold w-fit p-2 rounded-xl self-center">
               <BookOpenIcon />
                <span className="self-center">Read This Blog</span>
              </button>
            </Link>
          )
        )}
      </div>
    </>
  );
}
