"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function Step3() {
  const router = useRouter();
  const [orientation, setOrientation] = useState("");
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!orientation) return setError("Please choose a sexual orientation");
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sexualOrientation: orientation }),
    });
    router.push("/onboarding/step4");
  };

  const options = [
    "Straight",
    "Gay",
    "Lesbian",
    "Bisexual",
    "Pansexual",
    "Asexual",
    "Queer",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[url('/step_bg1.png')] bg-cover bg-center">
      <div className=" px-4 pt-9 mt-16 rounded-b-xl flex justify-between items-center ">
        <button onClick={() => router.push("/welcome")} className=" text-xl">
          <ChevronLeft size={24} />
        </button>
        <Image src="/serein.svg" alt="Serein Logo" width={94} height={30} />
        <span className="text-sm ">Step 3 of 4</span>
      </div>

      <div className="flex-1 p-6 max-w-md w-full mx-auto space-y-5">
        <h2 className="text-center text-xl font-semibold mb-10">
          What is your sexual orientation?
        </h2>
        <hr className="border-0 h-[3px] bg-[#e9e4d4] w-full" />

        <div className="space-y-4">
          {options.map((option) => {
            const isSelected = orientation === option;
            return (
              <div key={option} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    setOrientation(option);
                    setError("");
                  }}
                  className={`w-full h-11  py-2.5  rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] justify-center items-center overflow-hidden text-neutral-700 text-lg font-semibold
                    ${isSelected ? "bg-[#cee4ae]" : "bg-[#f4dda5]"}
                    `}
                >
                  {option}
                </button>
              </div>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="fixed bottom-5 left-0 w-full  p-4 ">
        <button
          onClick={handleNext}
          className="w-full h-11 bg-gradient-to-r from-[#2c3e50]/90 to-[#2980b9]/80 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] inline-flex justify-center items-center overflow-hidden mb-6 text-center text-white text-xl font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
