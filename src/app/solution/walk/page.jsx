// app/solution/walk/page.jsx (step 1)
"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { WalkContext } from "./layout";
import Image from "next/image";

export default function WalkPage1() {
  const { duration, setDuration, startAudio } = useContext(WalkContext);
  const hours = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const router = useRouter();

  const clamp = (v, max) => (v < 0 ? 0 : v > max ? max : v);
  const handleStart = () => {
    startAudio();
    router.push("/solution/walk/step2");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className=" text-black text-2xl font-bold mt-28 mb-2">
        Going for a Walk
      </h2>
      <p className="text-center text-black text-base mb-20">
        How long do you want your walk to be?
      </p>

      <div className="w-[218px] h-[102px] flex items-center justify-between mb-16">
        {/* HOURS 列 */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="flex items-center justify-center"
            onClick={() =>
              setDuration((d) =>
                clamp((hours + 1) * 3600 + mins * 60, 23 * 3600 + 59 * 60)
              )
            }
          >
            <Image
              src="/icons/triangle-up.svg"
              alt="Increase hours"
              width={33}
              height={20}
            />
          </button>
          <div className="w-[96px] h-[66px] border border-gray-400 flex items-center justify-center text-3xl">
            {String(hours).padStart(2, "0")}
          </div>
          <button
            className="flex items-center justify-center"
            onClick={() =>
              setDuration((d) =>
                clamp((hours - 1) * 3600 + mins * 60, 23 * 3600 + 59 * 60)
              )
            }
          >
            <Image
              src="/icons/triangle-down.svg"
              alt="Increase hours"
              width={33}
              height={20}
            />
          </button>
        </div>

        {/* 冒号 */}
        <div className="w-[36px] h-[66px] flex flex-col justify-center items-center">
          <div className="w-2 h-2 rounded-full bg-black mb-2" />
          <div className="w-2 h-2 rounded-full bg-black" />
        </div>

        {/* MINUTES 列 */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="flex items-center justify-center"
            onClick={() =>
              setDuration((d) =>
                clamp(hours * 3600 + (mins + 1) * 60, 23 * 3600 + 59 * 60)
              )
            }
          >
            <Image
              src="/icons/triangle-up.svg"
              alt="Increase hours"
              width={33}
              height={20}
            />
          </button>
          <div className="w-[96px] h-[66px] border border-gray-400 flex items-center justify-center text-3xl">
            {String(mins).padStart(2, "0")}
          </div>
          <button
            className="flex items-center justify-center"
            onClick={() =>
              setDuration((d) =>
                clamp(hours * 3600 + (mins - 1) * 60, 23 * 3600 + 59 * 60)
              )
            }
          >
            <Image
              src="/icons/triangle-down.svg"
              alt="Increase hours"
              width={33}
              height={20}
            />
          </button>
        </div>
      </div>

      <button
        className=" bg-[#EAD098] text-gray-800 py-3 rounded-xl font-semibold w-full hover:opacity-90 transition"
        onClick={handleStart}
      >
        Start
      </button>
    </div>
  );
}
