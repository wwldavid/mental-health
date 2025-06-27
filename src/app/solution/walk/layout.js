// app/solution/walk/layout.js
"use client";
import { createContext, useState, useRef, useMemo, useCallback } from "react";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export const WalkContext = createContext(null);

export default function WalkLayout({ children }) {
  const [duration, setDuration] = useState(5 * 60);
  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const startTimeRef = useRef(null);

  const startAudio = () => {
    // 如果已经有音频在播放，先停止
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // 创建新的音频对象
    audioRef.current = new Audio("/audios/just-relax.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    audioRef.current.play().catch((err) => {
      console.warn("Audio 播放被阻止：", err);
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      // 不要设为 null，保留引用以便重复使用
    }
  };

  const value = useMemo(
    () => ({
      duration,
      setDuration,
      elapsed,
      setElapsed,
      progress,
      setProgress,
      stepIndex,
      setStepIndex,
      intervalRef,
      audioRef,
      startTimeRef,
      startAudio,
      stopAudio,
    }),
    [duration, elapsed, progress, stepIndex]
  );

  const path = usePathname(); // 例如 "/solution/walk" 或 "/solution/walk/step2"

  return (
    <WalkContext.Provider value={value}>
      <div className=" min-h-screen flex flex-col">
        <Upperbar title="Walk" />
        <div className="mt-8 mb-32">{children}</div>
        <Navbar />
      </div>
    </WalkContext.Provider>
  );
}
