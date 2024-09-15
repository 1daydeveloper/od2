import React from 'react';
import Image from "next/image";

const Header = () => {
  return (
    <header>
     <div className="header flex" id="header">
          <Image
            src="/odd.png"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className="m-8 ml-0 w-60 h-37 flex-auto border-10 bg-card_bg_color rounded  content-center text-center ">
            {" "}
            Nav Bar
          </div>
        </div>
    </header>
  );
};

export default Header;