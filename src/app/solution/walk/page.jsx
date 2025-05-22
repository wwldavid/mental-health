"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // 你如果用的是 shadcn/ui 组件库

export default function WalkPage() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audios/nature-sounds.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.play();

    return () => audio.pause();
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center text-center px-6">
      {/* 返回按钮 */}
      <div className="absolute top-6 left-6">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
        Take a Walk
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-10">
        Breathe deeply. Feel the ground beneath your feet. Let each step bring
        you calm.
      </p>
      <div className="w-64 h-64 bg-[url('/images/walk-illustration.jpg')] bg-cover bg-center mb-10 rounded-2xl shadow-xl" />

      <Button
        className="bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
        onClick={() => setShowToast(true)}
      >
        Start Walking
      </Button>

      {showToast && (
        <div className="absolute bottom-30 bg-white text-green-800 px-6 py-3 rounded-xl shadow-lg animate-fadeInOut">
          🌿 Enjoy your walk!
        </div>
      )}
    </main>
  );
}
