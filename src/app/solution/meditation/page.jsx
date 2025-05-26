"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5); // 默认5分钟
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [timerActive, setTimerActive] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);

      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const startMeditation = () => {
    setTimeLeft(duration * 60);
    setTimerActive(true);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const router = useRouter();
  return (
    <div className="max-w-xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-center gap-14">
        <h1 className="text-3xl font-bold">Try Meditation</h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="bg-[#8b968d] text-white"
        >
          Back
        </Button>
      </div>
      <p className="text-muted-foreground">
        Practice mindfulness to stay grounded and reduce anxiety.
      </p>

      <Card>
        <CardContent className="py-6 space-y-4">
          <h2 className="text-xl font-semibold">Choose Duration</h2>
          <Slider
            min={1}
            max={10}
            step={1}
            defaultValue={[duration]}
            onValueChange={(val) => {
              setDuration(val[0]);
              setTimeLeft(val[0] * 60);
            }}
          />
          <p>{duration} minutes</p>

          <div className="flex items-center gap-4">
            <Button
              onClick={startMeditation}
              className="bg-[#00a3af] hover:opacity-90 text-white"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Start
            </Button>
            <div className="text-lg font-mono">{formatTime(timeLeft)}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6 space-y-4">
          <h2 className="text-xl font-semibold">Guided Audio</h2>
          <audio
            ref={audioRef}
            src="/audios/rain.mp3"
            onEnded={() => setIsPlaying(false)}
          />
          <Button
            onClick={() => {
              const audio = audioRef.current;
              if (isPlaying) {
                audio.pause();
              } else {
                audio.play();
              }
              setIsPlaying(!isPlaying);
            }}
            className="bg-[#00a3af] hover:opacity-90 text-white"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" /> Play
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="bg-muted rounded-xl p-4 text-center text-muted-foreground">
        <p>
          “Close your eyes. Take a deep breath. Let your thoughts pass like
          clouds.”
        </p>
      </div>
    </div>
  );
}
