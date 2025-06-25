// app/solution/walk/step2/page.jsx
"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { WalkContext } from "../layout";

const walkerImages = [
  "/icons/walker1.png",
  "/icons/walker2.png",
  "/icons/walker3.png",
  "/icons/walker4.png",
  "/icons/walker5.png",
];

export default function WalkPage2() {
  const {
    duration,
    elapsed,
    setElapsed,
    progress,
    setProgress,
    stepIndex,
    setStepIndex,
    intervalRef,
    startTimeRef,
    startAudio,
    stopAudio,
  } = useContext(WalkContext);

  const [realPathLength, setRealPathLength] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const walkerIntervalRef = useRef(null);
  const router = useRouter();

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  // Stop everything (timers, animation, audio) and show summary
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (walkerIntervalRef.current) {
      clearInterval(walkerIntervalRef.current);
      walkerIntervalRef.current = null;
    }
    stopAudio();
    setShowSummary(true);
  };

  // On mount (or when duration changes): reset state, measure path, start audio & timer
  useEffect(() => {
    // Reset any leftover state
    setElapsed(0);
    setProgress(0);
    setStepIndex(0);
    setShowSummary(false);

    // Measure the SVG path length
    const pathEl = document.getElementById("mainPath");
    if (pathEl) {
      setRealPathLength(pathEl.getTotalLength());
    }

    // Start the background audio
    startAudio();

    // Kick off the walking timer
    startTimeRef.current = Date.now();
    const timerId = setInterval(() => {
      setElapsed((e) => {
        const ne = e + 1;
        setProgress(Math.min(ne / duration, 1));
        if (ne >= duration) {
          handleStop();
        }
        return ne;
      });
    }, 1000);
    intervalRef.current = timerId;

    // Cleanup on unmount
    return () => {
      clearInterval(timerId);
      if (walkerIntervalRef.current) {
        clearInterval(walkerIntervalRef.current);
        walkerIntervalRef.current = null;
      }
      stopAudio();
    };
  }, [duration]); // ← only re-run if the user picks a different duration

  // Walker sprite frame animation (runs continuously)
  useEffect(() => {
    const walkId = setInterval(() => {
      setStepIndex((i) => (i + 1) % walkerImages.length);
    }, 400);
    walkerIntervalRef.current = walkId;
    return () => clearInterval(walkId);
  }, []);

  // Navigation
  const handleRestart = () => router.push("/solution/walk");
  const feelBetter = () => router.push("/solution/walk/step3");
  const moreActs = () => router.push("/wellness");

  return (
    <div className="flex flex-col items-center p-4 mt-28">
      {/* —— SVG: path, highlight, trees, walker —— */}
      <svg viewBox="0 0 300 300" className="w-64 h-64 mb-6 drop-shadow-lg">
        <g transform="translate(45, 50)">
          {/* Background path */}
          <path
            id="mainPath"
            d="M102.436 183.122L186.471 117.13L195.925 108.174C197.676 106.917 201.668 102.046 203.629 92.6182C205.589 83.1908 199.31 76.1202 195.925 73.7633L174.566 57.2652C154.841 41.5528 114.691 9.56221 111.89 7.29962C108.388 4.47137 99.9849 4 97.5339 4C95.573 4 90.1808 6.19974 87.7297 7.29962C62.1689 27.4116 10.4871 68.2011 8.24617 70.4637C5.44499 73.2919 3.69425 79.4198 4.0444 85.0763C4.32451 89.6015 6.96229 93.561 8.24617 94.9751C20.5013 105.188 45.5019 125.803 47.4627 126.557C49.9137 127.5 52.0146 129.857 52.3648 133.156C52.6449 135.796 51.0809 138.341 50.2639 139.284C47.2293 141.327 40.7399 145.978 39.0592 148.24C36.9583 151.069 36.6081 152.483 36.6081 158.611C36.6081 163.513 39.6427 167.567 41.16 168.981C48.8633 175.423 64.69 188.496 66.3707 189.25C68.4715 190.193 76.1748 194.435 82.8276 193.964C88.1498 193.586 98.1174 186.579 102.436 183.122Z"
            stroke="#ccc"
            strokeWidth="7"
            fill="none"
          />
          {/* Highlight path */}
          <path
            d="M102.436 183.122L186.471 117.13L195.925 108.174C197.676 106.917 201.668 102.046 203.629 92.6182C205.589 83.1908 199.31 76.1202 195.925 73.7633L174.566 57.2652C154.841 41.5528 114.691 9.56221 111.89 7.29962C108.388 4.47137 99.9849 4 97.5339 4C95.573 4 90.1808 6.19974 87.7297 7.29962C62.1689 27.4116 10.4871 68.2011 8.24617 70.4637C5.44499 73.2919 3.69425 79.4198 4.0444 85.0763C4.32451 89.6015 6.96229 93.561 8.24617 94.9751C20.5013 105.188 45.5019 125.803 47.4627 126.557C49.9137 127.5 52.0146 129.857 52.3648 133.156C52.6449 135.796 51.0809 138.341 50.2639 139.284C47.2293 141.327 40.7399 145.978 39.0592 148.24C36.9583 151.069 36.6081 152.483 36.6081 158.611C36.6081 163.513 39.6427 167.567 41.16 168.981C48.8633 175.423 64.69 188.496 66.3707 189.25C68.4715 190.193 76.1748 194.435 82.8276 193.964C88.1498 193.586 98.1174 186.579 102.436 183.122Z"
            stroke="#22c55e"
            strokeWidth="7"
            fill="none"
            strokeDasharray={realPathLength}
            strokeDashoffset={realPathLength * (1 - progress)}
          />
        </g>

        {/* Trees */}
        <image href="/icons/tree1.png" x="40" y="40" width="60" height="60" />
        <image href="/icons/tree2.png" x="110" y="190" width="35" height="50" />
        <image href="/icons/tree3.png" x="190" y="60" width="38" height="38" />
        <image href="/icons/tree4.png" x="180" y="190" width="42" height="42" />
        <image href="/icons/tree4.png" x="140" y="40" width="70" height="70" />
        <image href="/icons/tree6.png" x="210" y="140" width="50" height="50" />
        <image href="/icons/tree7.png" x="50" y="140" width="80" height="80" />

        {/* Walker sprite */}
        <image
          href={walkerImages[stepIndex]}
          width="40"
          height="40"
          x="120"
          y="120"
        />
      </svg>
      <p className="text-xl font-semibold text-green-900 mb-20">
        You walked for {mins} minute{mins !== 1 && "s"} and {secs} second
        {secs !== 1 && "s"}!
      </p>

      {!showSummary ? (
        <button
          className=" bg-[#EAD098] text-gray-800 py-3 rounded-xl font-semibold w-full hover:opacity-90 transition"
          onClick={handleStop}
        >
          Stop
        </button>
      ) : (
        <div className="w-full flex flex-col items-center space-y-4">
          <button
            className=" bg-[#EAD098] text-gray-800 py-3 rounded-xl font-semibold w-full hover:opacity-90 transition"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className=" bg-[#EAD098] text-gray-800 py-3 rounded-xl font-semibold w-full hover:opacity-90 transition"
            onClick={feelBetter}
          >
            I am Feeling Better
          </button>
          <button
            className=" bg-[#EAD098] text-gray-800 py-3 rounded-xl font-semibold w-full hover:opacity-90 transition"
            onClick={moreActs}
          >
            More Activities
          </button>
        </div>
      )}
    </div>
  );
}
