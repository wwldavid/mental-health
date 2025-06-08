"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WalkPage() {
  const router = useRouter();
  const [isWalking, setIsWalking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pathProgress, setPathProgress] = useState(0); // 0 to 1
  const [showSummary, setShowSummary] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const PATH_LENGTH = 790; // 这个值来自路径大概长度，可以用浏览器开发者工具精确测
  const TOTAL_DURATION = 900; // 总共走多长时间，秒（会控制速度）

  // 启动步行
  const startWalking = () => {
    setIsWalking(true);
    setIsPaused(false);
    setShowSummary(false);
    setElapsedTime(0);
    setPathProgress(0);

    audioRef.current = new Audio("/audios/nature-sounds.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    audioRef.current.play();

    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const newElapsed = prev + 1;
        setPathProgress(Math.min(newElapsed / TOTAL_DURATION, 1));
        return newElapsed;
      });
    }, 1000);
  };

  const togglePause = () => {
    if (isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          const newElapsed = prev + 1;
          setPathProgress(Math.min(newElapsed / TOTAL_DURATION, 1));
          return newElapsed;
        });
      }, 1000);
      audioRef.current?.play();
      setIsPaused(false);
    } else {
      clearInterval(intervalRef.current);
      audioRef.current?.pause();
      setIsPaused(true);
    }
  };

  const endWalking = () => {
    clearInterval(intervalRef.current);
    audioRef.current?.pause();
    setIsWalking(false);
    setIsPaused(false);
    setShowSummary(true);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      audioRef.current?.pause();
    };
  }, []);

  const [stepIndex, setStepIndex] = useState(0);
  const walkerImages = [
    "/icons/walker1.png",
    "/icons/walker2.png",
    "/icons/walker3.png",
    "/icons/walker4.png",
    "/icons/walker5.png",
  ];

  useEffect(() => {
    if (isWalking && !isPaused) {
      const stepTimer = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % walkerImages.length);
      }, 400); // 每400ms切换一帧
      return () => clearInterval(stepTimer);
    }
  }, [isWalking, isPaused]);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center text-center px-4 pt-16 pb-32">
      <div className="absolute top-6 left-6">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">
        Take a Walk
      </h1>
      <p className="text-base md:text-lg text-gray-700 max-w-md mb-6">
        Breathe deeply. Walk at your own pace. Let the path guide your calm.
      </p>

      <svg
        viewBox="0 0 300 300"
        className="w-64 h-64 md:w-80 md:h-80 mb-8 drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(45, 50)">
          {/* 背景路径 */}
          <path
            id="mainPath"
            d="M102.436 183.122L186.471 117.13L195.925 108.174C197.676 106.917 201.668 102.046 203.629 92.6182C205.589 83.1908 199.31 76.1202 195.925 73.7633L174.566 57.2652C154.841 41.5528 114.691 9.56221 111.89 7.29962C108.388 4.47137 99.9849 4 97.5339 4C95.573 4 90.1808 6.19974 87.7297 7.29962C62.1689 27.4116 10.4871 68.2011 8.24617 70.4637C5.44499 73.2919 3.69425 79.4198 4.0444 85.0763C4.32451 89.6015 6.96229 93.561 8.24617 94.9751C20.5013 105.188 45.5019 125.803 47.4627 126.557C49.9137 127.5 52.0146 129.857 52.3648 133.156C52.6449 135.796 51.0809 138.341 50.2639 139.284C47.2293 141.327 40.7399 145.978 39.0592 148.24C36.9583 151.069 36.6081 152.483 36.6081 158.611C36.6081 163.513 39.6427 167.567 41.16 168.981C48.8633 175.423 64.69 188.496 66.3707 189.25C68.4715 190.193 76.1748 194.435 82.8276 193.964C88.1498 193.586 98.1174 186.579 102.436 183.122Z"
            stroke="#ccc"
            strokeWidth="7"
            fill="none"
          />

          {/* 高亮路径 */}
          {isWalking && (
            <path
              d="M102.436 183.122L186.471 117.13L195.925 108.174C197.676 106.917 201.668 102.046 203.629 92.6182C205.589 83.1908 199.31 76.1202 195.925 73.7633L174.566 57.2652C154.841 41.5528 114.691 9.56221 111.89 7.29962C108.388 4.47137 99.9849 4 97.5339 4C95.573 4 90.1808 6.19974 87.7297 7.29962C62.1689 27.4116 10.4871 68.2011 8.24617 70.4637C5.44499 73.2919 3.69425 79.4198 4.0444 85.0763C4.32451 89.6015 6.96229 93.561 8.24617 94.9751C20.5013 105.188 45.5019 125.803 47.4627 126.557C49.9137 127.5 52.0146 129.857 52.3648 133.156C52.6449 135.796 51.0809 138.341 50.2639 139.284C47.2293 141.327 40.7399 145.978 39.0592 148.24C36.9583 151.069 36.6081 152.483 36.6081 158.611C36.6081 163.513 39.6427 167.567 41.16 168.981C48.8633 175.423 64.69 188.496 66.3707 189.25C68.4715 190.193 76.1748 194.435 82.8276 193.964C88.1498 193.586 98.1174 186.579 102.436 183.122Z"
              stroke="#22c55e"
              strokeWidth="7"
              fill="none"
              strokeDasharray={PATH_LENGTH}
              strokeDashoffset={PATH_LENGTH * (1 - pathProgress)}
            />
          )}
        </g>
        <image href="/icons/tree1.png" x="40" y="40" width="60" height="60" />
        <image href="/icons/tree2.png" x="110" y="190" width="35" height="50" />
        <image href="/icons/tree3.png" x="190" y="60" width="38" height="38" />
        <image href="/icons/tree4.png" x="180" y="190" width="42" height="42" />
        <image href="/icons/tree4.png" x="140" y="40" width="70" height="70" />
        <image href="/icons/tree6.png" x="210" y="140" width="50" height="50" />
        <image href="/icons/tree7.png" x="50" y="140" width="80" height="80" />

        {/* 小人 */}
        {isWalking && !showSummary && (
          <g>
            <animateMotion
              dur={`${TOTAL_DURATION}s`}
              repeatCount="indefinite"
              begin="0s"
              fill="freeze"
              keyPoints={`${pathProgress};${pathProgress + 0.001}`}
              keyTimes="0;1"
              calcMode="linear"
              rotate="auto"
            >
              <mpath href="#mainPath" />
            </animateMotion>
            <image
              href={walkerImages[stepIndex]}
              width="30"
              height="30"
              x="1"
              y="40"
            />
          </g>
        )}
      </svg>

      {/* 控制按钮 */}
      {!isWalking && !showSummary && (
        <Button
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          onClick={startWalking}
        >
          Start Walking
        </Button>
      )}

      {isWalking && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-green-800 font-medium text-lg">
            You have been walking for {elapsedTime} second
            {elapsedTime !== 1 && "s"} 🍃
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={togglePause}>
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button variant="destructive" onClick={endWalking}>
              End Walk
            </Button>
          </div>
        </div>
      )}

      {showSummary && (
        <div className="mt-8 text-green-900 text-xl font-semibold">
          🌟 You walked for {elapsedTime} second{elapsedTime !== 1 && "s"}!
          Great job!
        </div>
      )}
    </main>
  );
}
