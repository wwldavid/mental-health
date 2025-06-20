"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step4() {
  const router = useRouter();
  const options = [
    "I am stressed or anxious",
    "I am feeling depressed",
    "I have been feeling sad",
    "I am going through difficult times",
    "I have difficulty falling asleep",
    "I am concerned about my thought patterns",
    "I am concerned about my emotional well-being",
    "I want to improve my habits",
    "I want to talk to someone",
    "I am just exploring",
    "Other",
  ];
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");

  const toggle = (opt) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  };

  const handleNext = async () => {
    if (selected.length === 0) {
      setError("Please select at least one option.");
      return;
    }
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reasons: selected.join(",") }),
    });
    router.push("/onboarding/step5");
  };

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="flex justify-between items-center mt-10 px-4 h-12 mb-6 bg-[#EAD098] rounded-bl-2xl rounded-br-2xl">
        <button onClick={() => router.back()} className="text-gray-600 text-xl">
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-gray-600">Step 4 of 5</span>
      </div>
      <h2 className="text-2xl font-semibold mb-4">What brings you here?</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="overflow-y-auto pr-2 space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="mt-6 w-full h-11 mx-auto block bg-[#325C77] rounded-2xl text-white py-2 mb-6 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200"
      >
        Next
      </button>
    </div>
  );
}
