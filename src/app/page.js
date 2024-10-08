"use client";
import Image from "next/image";
import React from "react";
import anime from "animejs/lib/anime.min.js";
import MaintenancePage from "./components/maintanance";

const Home = () => {
  React.useEffect(() => {
    anime({
      targets: ".loading-circle",
      scale: [
        { value: 1.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      rotate: "1turn",
      loop: true,
    });
  }, []);

  return (
  <MaintenancePage/>
  );
};


export default Home;
