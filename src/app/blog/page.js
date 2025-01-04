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
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4">My Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPostsData.map(
            ({ id, title, date, author, keywords, catagory, description }) => (
              <div key={id} className="border rounded-lg p-4 hover:scale-105">
                <Link href={`/blog/${id}`} className="text-2xl ">
                  <h4 className="text-3xl mb-2"> {title}</h4>
                  <div className="flex flex-wrap mb-3 text-black gap-2">
                    <div className="text-lg  rounded-full  px-3 bg-white ">
                      {date}
                    </div>
                    <div className="text-lg  rounded-full  px-3 bg-orange-500 ">
                      {author}
                    </div>
                    <div className="text-lg  rounded-full  px-3 bg-orange-500 ">
                      C: {catagory}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <p className=" text-base line-clamp-2">{description}</p>
                    <div className="flex flex-wrap  mb-2 text-black gap-2">
                      {convertToHashTags(keywords)}
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
