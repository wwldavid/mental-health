"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step2() {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!gender) return setError("Please select a gender identity");
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genderIdentity: gender }),
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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#325C77] px-4 pt-9 pb-3 rounded-b-xl flex justify-between items-center shadow-md">
        <button onClick={() => router.back()}>
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
        <span className="text-white font-medium">Step 2 of 4</span>
      </div>

      <div className="flex-1 p-6 max-w-md w-full mx-auto space-y-14">
        <h2 className="text-xl font-semibold text-gray-800">
          What is your gender identity?
        </h2>

        <div className="space-y-4">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center text-gray-800 text-sm"
            >
              <input
                type="checkbox"
                checked={gender === option}
                onChange={() => setGender(option)}
                className="mr-3 w-5 h-5 rounded border-gray-400"
              />
              {option}
            </label>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="fixed bottom-5 left-0 w-full  p-4 ">
        <button
          onClick={handleNext}
          className=" bg-[#EAD098] text-gray-800 py-3 rounded-xl font-semibold w-full hover:opacity-90 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
