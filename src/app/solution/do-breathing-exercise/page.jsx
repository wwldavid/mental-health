"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const phases = ["Breathe In", "Hold", "Breathe Out"];
const durations = [4000, 4000, 4000]; // 毫秒

export default function Breathing() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [circleSize, setCircleSize] = useState("w-20 h-20");
  const router = useRouter();

  const audioRef = useRef(null);

  useEffect(() => {
    if (!running) return;

    const timeout = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, durations[phaseIndex]);

    // 动态调整动画圆圈大小
    if (phases[phaseIndex] === "Breathe In") {
      setCircleSize("w-48 h-48");
    } else if (phases[phaseIndex] === "Hold") {
      setCircleSize("w-48 h-48");
    } else {
      setCircleSize("w-20 h-20");
    }

    return () => clearTimeout(timeout);
  }, [phaseIndex, running]);

  const startExercise = () => {
    setRunning(true);
    setPhaseIndex(0);
    if (audioRef.current) {
      audioRef.current.current = 0;
      audioRef.current.play();
    }
  };

  const stopExercise = () => {
    setRunning(false);
    setPhaseIndex(0);
    setCircleSize("w-20 h-20");
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Breathing Exercise
      </h1>

      <div
        className={`transition-all duration-1000 ease-in-out bg-blue-300 rounded-full ${circleSize} mb-6`}
      ></div>

      <p className="text-xl font-semibold text-gray-700 mb-4">
        {running ? phases[phaseIndex] : "Ready to begin?"}
      </p>

      <div className="flex gap-4 mb-8">
        {!running ? (
          <Button onClick={startExercise}>Start</Button>
        ) : (
          <Button variant="outline" onClick={stopExercise}>
            Stop
          </Button>
        )}
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <p className="text-sm text-gray-500">
        Follow the animation to breathe slowly. Do this for a few minutes to
        relax.
      </p>
      <audio ref={audioRef} loop volumn={0.2}>
        <source src="/audios/breath.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
