import React from 'react';
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
   <div className=" h-20 fixed bottom-0 left-0 flex w-full items-end justify-center bg-black">
          <div className="flex-auto w-30 ">
          </div>
          <div className="flex-auto w-40content-between justify-items-center">
              <Image
                src="/odd.png"
                alt="OD2 Logo"
                className="-mt-9 bg-black mx-auto border-white border-2 rounded-lg"
                width={100}
                height={100}
                priority
              />
            <h3 className="text-center outline-text_color pt-3">ONE DAY DEVELOPERS</h3>
          </div>
          <div className="flex-auto w-30">
            <h3>custom part</h3>
          </div>
        </div>
    </footer>
  );
};

export default Footer;