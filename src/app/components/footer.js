"use client";
import { useEffect, useState ,React} from 'react';
import Image from "next/image";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
      const handleScroll = () => {
          // Hide the div when scrolling down
          if (window.scrollY > 0) {
              setIsVisible(false);
          } else {
              setIsVisible(true);
          }
      };

      window.addEventListener('scroll', handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  return (
  
    <footer className={`${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
   <div className=" h-20 fixed bottom-0 left-0 flex w-full items-end justify-center bg-orange-400">
          <div className="flex-auto w-30 ">
          </div>
          <div className="flex-auto w-40content-between justify-items-center">
              <Image
                src="/odd.png"
                alt="OD2 Logo"
                className="-mt-9  mx-auto border-white border-2 bg-black rounded-lg"
                width={100}
                height={100}
                priority
              />
            <h3 className="text-center font-bold font-serif  text-black pt-3">ONE DAY DEVELOPERS</h3>
          </div>
          <div className="flex-auto w-30">

          </div>
        </div>
    </footer>
  );
};

export default Footer;