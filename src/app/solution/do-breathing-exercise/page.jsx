"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const phases = ["Breathe In", "Hold", "Breathe Out"];
const durations = [4000, 4000, 4000];

export default function Breathing() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [circleSize, setCircleSize] = useState("w-20 h-20");
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const audioRef = useRef(null);
  const timerRef = useRef(null);

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
    setCircleSize("w-20 h-20");
    setShowOptions(false);
    if (audioRef.current) {
      audioRef.current.current = 0;
      audioRef.current.play();
    }
  };

  const stopExercise = () => {
    setRunning(false);
    setPhaseIndex(0);
    setCircleSize("w-20 h-20");
    clearTimeout(timerRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setShowOptions(true);
  };

  const feelBetter = () => router.push("/solution/do-breathing-exercise/step2");
  const moreActs = () => router.push("/wellness");

  return (
    <div className="flex flex-col items-center mt-36 p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Breathing Exercise</h1>
      <p className="text-black text-base font-normal ">
        Follow the animation to relax your body and reset your focus.
      </p>
      <div className="w-52 h-52 flex items-center justify-center my-6">
        <div
          className={`transition-all duration-1000 ease-in-out bg-blue-300 rounded-full ${circleSize} mb-6`}
        ></div>
      </div>

      <p className=" text-black text-xl font-bold mb-5">
        {running ? phases[phaseIndex] : "Whenever you are ready"}
      </p>

      <button
        className="w-28 h-11 bg-black flex justify-center items-center text-white text-xl font-bold"
        onClick={running ? stopExercise : startExercise}
      >
        {running ? "Stop" : "Start"}
      </button>

      {showOptions && (
        <div className="flex flex-col items-center space-y-4 mt-6">
          <button
            className="w-[361px] h-[46px] bg-black text-white rounded"
            onClick={feelBetter}
          >
            I am Feeling Better
          </button>
          <button
            className="w-[361px] h-[46px] bg-black text-white rounded"
            onClick={moreActs}
          >
            More Activities
          </button>
        </div>
      )}

      <audio ref={audioRef} loop volumn={0.2}>
        <source src="/audios/breath.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
