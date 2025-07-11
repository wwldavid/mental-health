// src>app>wellness>page.js
"use client";

import Navbar from "@/components/Navbar";
import Upperbar from "@/components/Upperbar";

import { useRouter } from "next/navigation";
import Image from "next/image";

const features = [
  {
    title: "Breathing Exercise",
    icon: "/images/breathing.png",
    path: "/solution/do-breathing-exercise",
  },
  {
    title: "Going for a Walk",
    icon: "/images/walk.png",
    path: "/solution/walk",
  },
  {
    title: "Body Scan",
    icon: "/images/body-scan.png",
    path: "/solution/body-scan",
  },
  {
    title: "Gratitude Practice",
    icon: "/images/gratitude.png",
    path: "/solution/gratitude",
  },
  {
    title: "Self-Compassion",
    icon: "/images/compassion.png",
    path: "/solution/self-compassion",
  },
  {
    title: "Five Senses",
    icon: "/images/five-senses.png",
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
              className="cursor-pointer flex flex-col items-center justify-center p-4 border rounded-[10px] shadow hover:shadow-lg transition w-[172px] h-[151px] bg-[#EAD098]"
            >
              <div className="w-20 h-20 mb-2">
                <Image
                  src={f.icon}
                  alt={f.title}
                  width={76}
                  height={76}
                  className="w-full h-full object-contain"
                  style={{
                    filter: "brightness(0) invert(1) brightness(0.35)",
                  }}
                />
              </div>
              <span className="w-[188px] h-[20px] text-center text-base font-medium text-[#fff]">
                {f.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
