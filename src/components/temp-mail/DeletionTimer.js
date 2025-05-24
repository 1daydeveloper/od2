// pages/deletion-timer.js

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    const nextMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const diff = nextMidnight - now;

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Deletion Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-6">
            {/* Hour Block */}
            <div className="flex flex-col items-center">
              <span className="text-5xl font-mono font-bold text-destructive">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <Badge variant="outline" className="mt-2 uppercase">
                Hours
              </Badge>
            </div>
            {/* Minute Block */}
            <div className="flex flex-col items-center">
              <span className="text-5xl font-mono font-bold text-destructive">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <Badge variant="outline" className="mt-2 uppercase">
                Minutes
              </Badge>
            </div>
            {/* Second Block */}
            <div className="flex flex-col items-center">
              <span className="text-5xl font-mono font-bold text-destructive">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <Badge variant="outline" className="mt-2 uppercase">
                Seconds
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
