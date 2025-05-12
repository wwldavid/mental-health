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
      </div>
    </div>
  );
}
