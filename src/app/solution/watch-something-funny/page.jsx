"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const funnyVideos = [
  "https://www.youtube.com/embed/C9E1BmpFn2M",
  "https://www.youtube.com/embed/tgbNymZ7vqY",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/9bZkp7q19f0",
];

const funnyQuotes = [
  "Laughter is the best medicine -- unless you have diarrhea. 💩",
  "I'm not lazy, I'm on energy-saving mode. 😴",
  "Why donot scientists trust atoms? Because they make up everything. 🤓",
  "If at first you do not succeed, then skydiving definitely isnot for you. 🪂",
  "Life is short. Smile while you still have teeth. 😁",
];

export default function SomethingFunny() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleRefresh = () => {
    setVideoIndex(Math.floor(Math.random() * funnyVideos.length));
    setQuoteIndex(Math.floor(Math.random() * funnyQuotes.length));
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Watch Something Funny 😂
      </h1>

      <p className="text-lg text-center italic mb-6">
        {funnyQuotes[quoteIndex]}
      </p>

      <div className="aspect-video mb-6">
        <iframe
          className="w-full h-full rounded-lg shadow-md"
          src={funnyVideos[videoIndex]}
          title="Funny Video"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleRefresh}
          className="bg-[#a4e2c6] text-black hover:bg-[#7fd0ae]"
        >
          Show Me Something Else!
        </Button>
      </div>
    </div>
  );
}
