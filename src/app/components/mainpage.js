"use client";
import styles from "../../styles/mainpage.module.css";
import { useEffect, useState, React } from "react";
const quotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote: "Get busy living or get busy dying.",
    author: "Stephen King",
  },
  {
    quote: "You have as much laughter as you have faith.",
    author: "Martin Luther",
  },
  {
    quote: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
  },
];
const Mainpage = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFade(true); // Start fade in
      }, 500); // Duration of fade out animation
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentQuote(quotes[index]);
  }, [index]);
  return (
    <div className={"flex-auto"}>
      <div
        className={styles.container + "flex-col bg-opacity-50"}
        style={{
        textAlign:'-webkit-center',
          backgroundImage: "url(/map.jpg)",
          height: "35vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div
    style={{ width: "80%" }}
    className="card top-10 items-center  bg-gray-400 bg-opacity-50 text-bg_color transform -translate-x-1/2 animate-wave"
>
    <div className="card-body">
        <div className="flex flex-col items-center p-4 font-mono text-black">
            <div className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
                <h5 className="text-xl font-bold">&ldquo;{currentQuote.quote}&ldquo;</h5>
                <p className="text-lg" style={{ textAlign: "right" }}>
                    - {currentQuote.author} -
                </p>
            </div>
        </div>
    </div>
</div>

      </div>
      
    </div>
  );
};

export default Mainpage;
