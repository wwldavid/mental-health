// src>app>wellness>page.js
"use client";

import Navbar from "@/components/Navbar";
import Upperbar from "@/components/Upperbar";

import { useRouter } from "next/navigation";
import Image from "next/image";

const features = [
  {
    title: "Breathing Exercise",
    icon: "/images/breath.svg",
    path: "/solution/do-breathing-exercise",
  },
  {
    title: "Going for a Walk",
    icon: "/images/walk_button.png",
    path: "/solution/walk",
  },
  {
    title: "Body Scan",
    icon: "/images/breath.svg",
    path: "/solution/body-scan",
  },
  {
    title: "Gratitude Practice",
    icon: "/images/breath.svg",
    path: "/solution/gratitude",
  },
  {
    title: "Self-Compassion",
    icon: "/images/breath.svg",
    path: "/solution/self-compassion",
  },
  {
    title: "Five Senses",
    icon: "/images/breath.svg",
    path: "/solution/five-senses",
  },
];

export default function Wellness() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <Upperbar title="Wellness" />
      <div className=" p-3">
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
