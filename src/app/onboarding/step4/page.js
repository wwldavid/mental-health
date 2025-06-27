"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
export default function Step4() {
  const router = useRouter();
  const [reasons, setReasons] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");

  const toggleReason = (reason) => {
    setReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleNext = async () => {
    if (!reasons.length) return setError("Please select at least one option");

    if (reasons.includes("Other") && !otherText.trim()) {
      setError("Please specify your reason for selecting Other");
      return;
    }

    const payload = { reasons };
    if (reasons.includes("Other")) {
      payload.otherReason = otherText.trim();
    }

    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    router.push("/onboarding/step5");
  };

  const options = [
    "I am stressed or anxious",
    "I am feeling depressed",
    "I am going through difficult times",
    "I have difficulty sleeping",
    "I want to improve my habits",
    "I want to talk to someone",
    "I am just exploring",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#325C77] px-4 pt-9 pb-3 rounded-b-xl flex justify-between items-center shadow-md">
        <button onClick={() => router.back()}>
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
        <span className="text-white font-medium">Step 4 of 4</span>
      </div>

      <div className="flex-1 p-6 max-w-md w-full mx-auto space-y-14">
        <h2 className="text-xl font-semibold text-gray-800">
          What brings you here today?
        </h2>

        <div className="space-y-4">
          {options.map((option) => (
            <div key={option}>
              <label className="flex items-center text-gray-800 text-sm">
                <input
                  type="checkbox"
                  checked={reasons.includes(option)}
                  onChange={() => toggleReason(option)}
                  className="mr-3 w-5 h-5 rounded border-gray-400"
                />
                {option}
              </label>
              {/* 如果是 Other 且被选中，就显示一个文本输入框 */}
              {option === "Other" && reasons.includes("Other") && (
                <textarea
                  rows={3}
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="Please specify"
                  className="mt-2 w-full px-3 py-2 border rounded text-sm resize-none"
                />
              )}
            </div>
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
