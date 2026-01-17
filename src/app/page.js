import React from "react";
import Mainpage from "@/components/mainpage";
import { getSortedPostsData } from "@main/lib/posts";

const Home = () => {
  const allPostsData = getSortedPostsData();
  const latestPosts = allPostsData.slice(0, 3);

  return <Mainpage latestPosts={latestPosts} />;
};

export default Home;
