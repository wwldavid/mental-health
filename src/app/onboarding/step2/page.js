"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function Step2() {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!gender) return setError("Please select a gender identity");

    if (gender === "Other" && !otherGender.trim()) {
      setError("Please specify your gender identity");
      return;
    }

    const payload = { genderIdentity: gender };
    if (gender === "Other") {
      payload.otherGenderIdentity = otherGender.trim();
    }

    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    router.push("/onboarding/step3");
  };

  const options = [
    "Woman",
    "Man",
    "Non-binary",
    "Trans woman / Trans man",
    "Genderqueer / Agender",
    "Other",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[url('/step_bg2.png')] bg-cover bg-center">
      <div className="relative px-4 pt-9 mt-16 rounded-b-xl flex justify-between items-center ">
        <button onClick={() => router.push("/welcome")} className=" text-xl">
          <ChevronLeft size={24} />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/serein.svg" alt="Serein Logo" width={94} height={30} />
        </div>
        <span className="text-sm ">Step 2 of 4</span>
      </div>

      <div className="flex-1 p-6 max-w-md w-full mx-auto space-y-5">
        <h2 className="text-center text-xl font-semibold mb-10">
          What is your gender identity?
        </h2>
        <hr className="border-0 h-[3px] bg-[#e9e4d4] w-full" />
        <div className="space-y-4">
          {options.map((option) => {
            const isSelected = gender === option;
            return (
              <div key={option} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    setGender(option);
                    setError("");
                  }}
                  className={`w-full h-11  py-2.5  rounded-3xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.30)] flex justify-center items-center overflow-hidden text-lg font-semibold border-2 text-[#325C77] ${
                    isSelected ? "bg-[#cee4ae]" : ""
                  }`}
                >
                  {option}
                </button>
                {option === "Other" && isSelected && (
                  <textarea
                    rows={2}
                    value={otherGender}
                    onChange={(e) => setOtherGender(e.target.value)}
                    placeholder="Please specify"
                    className="mt-2 w-full px-3 py-2 border rounded text-sm resize-none"
                  />
                )}
              </div>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="fixed bottom-5 left-0 w-full  p-4 ">
        <button
          onClick={handleNext}
          className="w-full h-11 bg-[#4782A9]  rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] inline-flex justify-center items-center overflow-hidden mb-6 text-center text-white text-xl font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
