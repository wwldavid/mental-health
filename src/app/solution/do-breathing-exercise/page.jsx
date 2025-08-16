"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const phases = ["Breathe In", "Hold", "Breathe Out"];
const durations = [4000, 4000, 4000];
const buttonStyle =
  "w-96 h-11  py-2.5 bg-[#4782A9] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] justify-center items-center gap-2.5 text-white font-semibold";

export default function Breathing() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [circleSize, setCircleSize] = useState("w-20 h-20");
  const [circleColor, setCircleColor] = useState("bg-[#D1E9EC]");
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
    if (phases[phaseIndex] === "Breathe In" || phases[phaseIndex] === "Hold") {
      setCircleSize("w-48 h-48");
      setCircleColor("bg-[#7CCBD5]");
    } else {
      setCircleSize("w-20 h-20");
      setCircleColor("bg-[#D1E9EC]");
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
    <div className="relative flex flex-col items-center mt-20 p-4 h-[71vh]">
      <h1 className="text-2xl font-bold mb-6 text-neutral-700">
        Breathing Exercise
      </h1>
      <p className="text-neutral-700 text-xl font-bold ">
        Follow the animation to relax your body and reset your focus.
      </p>
      <div className="w-52 h-52 flex items-center justify-center my-6">
        <div
          className={`transition-all duration-1000 ease-in-out ${circleColor} rounded-full ${circleSize} mb-6`}
        ></div>
      </div>

      <p className=" text-black text-xl font-bold mb-5">
        {running ? phases[phaseIndex] : "Whenever you are ready"}
      </p>

      {!showOptions && (
        <div className="fixed bottom-20 left-0 w-full p-4">
          <button
            className="w-full h-11 py-2.5 bg-[#4782A9] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] justify-center items-center gap-2.5 text-white font-semibold"
            onClick={running ? stopExercise : startExercise}
          >
            {running ? "Stop" : "Start"}
          </button>
        </div>
      )}

      {showOptions && (
        <div className="fixed bottom-20 left-0 w-full p-4">
          <div className="w-full flex flex-col items-center space-y-3 p-2">
            <button className={buttonStyle} onClick={feelBetter}>
              I am Feeling Better
            </button>
            <button className={buttonStyle} onClick={moreActs}>
              More Activities
            </button>
            <button
              className={buttonStyle}
              onClick={running ? stopExercise : startExercise}
            >
              {running ? "Stop" : "Start"}
            </button>
          </div>
        </div>
      )}

      <audio ref={audioRef} loop volumn={0.2}>
        <source src="/audios/breath.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
