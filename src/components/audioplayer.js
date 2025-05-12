import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PlayCircle, PauseCircle } from "lucide-react";

export default function AudioPlayer({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-[400px] h-[290px] border rounded-lg overflow-hidden shadow-md relative">
      <div className="relative w-full h-[230px]">
        <Image
          src={track.imageSrc}
          alt={track.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-2 text-white">
          <div className="flex items-center gap-2">
            <Image src={track.logoSrc} alt="logo" width={30} height={30} />
            <h3 className="text-lg font-semibold">{track.title}</h3>
          </div>

          <div className="self-center">
            {isPlaying ? (
              <PauseCircle
                size={48}
                onClick={togglePlay}
                className="cursor-pointer"
              />
            ) : (
              <PlayCircle
                size={48}
                onClick={togglePlay}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={track.audioSrc} />

      <div className="w-full h-[6px] bg-gray-300">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-center py-4 text-[#00552e]">
        {track.description}
      </p>
    </div>
  );
}
