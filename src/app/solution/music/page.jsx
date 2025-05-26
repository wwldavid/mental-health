"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AudioPlayer from "@/components/audioplayer";

import suggestions from "@/lib/suggestions";

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

export default function MusicPage() {
  const router = useRouter();

  const content = suggestions.find((s) => s.slug === "music");

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-14">
          <h1 className="text-3xl font-semibold mb-4">{content.title}</h1>
          <Button
            variant="outline"
            className="mb-6 bg-[#8b968d] text-white"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>

        <p className="text-lg text-gray-700">{content.description}</p>

        <div className="flex flex-wrap justify-center gap-4">
          {tracks.map((track, index) => (
            <AudioPlayer key={index} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
