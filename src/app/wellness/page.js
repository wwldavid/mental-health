// src>app>wellness>page.js
"use client";

import Navbar from "@/components/Navbar";
import Upperbar from "@/components/Upperbar";

import { useRouter } from "next/navigation";
import Image from "next/image";

const features = [
  {
    title: "Breathing Exercise",
    icon: "/images/breathing.webp",
    path: "/solution/do-breathing-exercise",
  },
  {
    title: "Going for a Walk",
    icon: "/images/walk_button.webp",
    path: "/solution/walk",
  },
  {
    title: "Gratitude Practice",
    icon: "/images/gratitude.webp",
    path: "/solution/gratitude",
  },
  {
    title: "Self-Compassion",
    icon: "/images/compassion.webp",
    path: "/solution/self-compassion",
  },
  {
    title: "Body Scan",
    icon: "/images/scan.webp",
    path: "/solution/body-scan",
  },
  {
    title: "Five Senses",
    icon: "/images/five-sense.webp",
    path: "/solution/five-senses",
  },
];

export default function Wellness() {
  const router = useRouter();

  return (
    <div className="min-h-svh flex flex-col ">
      <Upperbar title="Wellness" />
      <div className="mt-16 flex-1 overflow-y-auto px-3 pb-28">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => router.push(f.path)}
              className="cursor-pointer w-44 h-48 rounded-2xl"
            >
              <Image
                src={f.icon}
                alt={f.title}
                width={76}
                height={76}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
