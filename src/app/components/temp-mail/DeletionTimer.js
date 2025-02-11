// pages/deletion-timer.js

import { useState, useEffect } from "react";

export default function DeletionTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  function getTimeUntilMidnight() {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
    const diff = nextMidnight - now; // Difference in milliseconds

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-6">Deletion Timer</h2>
      <div className="flex space-x-4">
        {/* Hour Block */}
        <div className="flex flex-col items-center">
          <p className="text-6xl font-bold text-red-600 animate-pulse">
            {String(timeLeft.hours).padStart(2, "0")}
          </p>
          <p className="text-lg uppercase mt-2">Hours</p>
        </div>
        {/* Minute Block */}
        <div className="flex flex-col items-center">
          <p className="text-6xl font-bold text-red-600 animate-bounce">
            {String(timeLeft.minutes).padStart(2, "0")}
          </p>
          <p className="text-lg uppercase mt-2">Minutes</p>
        </div>
        {/* Second Block */}
        <div className="flex flex-col items-center">
          <p className="text-6xl font-bold text-red-600 animate-pulse">
            {String(timeLeft.seconds).padStart(2, "0")}
          </p>
          <p className="text-lg uppercase mt-2">Seconds</p>
        </div>
      </div>
    </div>
  );
}
