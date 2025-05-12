"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AudioPlayer from "@/components/audioplayer";

const tracks = [
  {
    audioSrc: "/audios/track1.mp3",
    imageSrc: "/images/cover1.jpg",
    logoSrc: "/images/logo.png",
    title: "Relaxing Music",
    description: "Listen to this when you feel stressed...",
  },
  {
    audioSrc: "/audios/track2.mp3",
    imageSrc: "/images/cover2.jpg",
    logoSrc: "/images/logo.png",
    title: "Focus Music",
    description: "For better concentration and focus.",
  },
];

export default function Subitem1Page() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.back()}
        >
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-6">Subitem 1</h1>

        <div className="flex flex-wrap justify-center gap-4">
          {tracks.map((track, index) => (
            <AudioPlayer key={index} track={track} />
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <p className="text-lg mb-4">
            Welcome to Subitem 1 page. This is where you can display content
            specific to this section.
          </p>

          <p className="mb-6">any content</p>

          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Feature 1 description</li>
              <li>Feature 2 description</li>
              <li>Feature 3 description</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
