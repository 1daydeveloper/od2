import { useEffect, useState } from 'react';

const TrendingWords = ({ addKeyToInput }) => {
  const [trendingWords, setTrendingWords] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTrendingWords = async () => {
      try {
        // Make the request to the Next.js API route
        const response = await fetch('/api/trending');
        const data = await response.json();
        // Set the trending words state
        setTrendingWords(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching trending words:', error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchTrendingWords();
  }, []);

  return (
    <div >
      {loading ? (
        <p>Loading Random Words...</p> // Show loading message while fetching
      ) : (
        <div className='flex flex-col gap-2 w-100 '>
          {/* Display common words */}
          <div>
            {trendingWords["commonwords"] && trendingWords["commonwords"].map((word, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 cursor-pointer rounded dark:bg-blue-900 dark:text-blue-300"
                onClick={() => addKeyToInput(word)} // Pass word directly
              >
                {word}
              </span>
            ))}
          </div>

          {/* Display trending words */}
          <div className='flex flex-wrap gap-1 '>
            {trendingWords["trendingWords"] && trendingWords["trendingWords"].map((word, index) => (
              <span
                key={index}
                className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 cursor-pointer rounded dark:bg-pink-900 dark:text-pink-300"
                onClick={() => addKeyToInput(word)} // Pass word directly
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingWords;
