"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
export default function Step4() {
  const router = useRouter();
  const [reasons, setReasons] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");

  const listRef = useRef(null);

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

  useEffect(() => {
    if (reasons.includes("Other") && listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [reasons]);

  return (
    <div className="min-h-screen flex flex-col bg-[url('/step_bg4.png')] bg-cover bg-center">
      <div className="relative px-4 pt-9 mt-16 rounded-b-xl flex justify-between items-center ">
        <button onClick={() => router.push("/welcome")} className=" text-xl">
          <ChevronLeft size={24} />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/serein.svg" alt="Serein Logo" width={94} height={30} />
        </div>
        <span className="text-sm ">Step 4 of 4</span>
      </div>

      <div className="flex-1 p-6 max-w-md w-full mx-auto space-y-5">
        <h2 className="text-center text-xl font-semibold mb-10">
          What brings you here today?
        </h2>
        <hr className="border-0 h-[3px] bg-[#e9e4d4] w-full" />

        <div ref={listRef} className="space-y-4 max-h-[58vh] overflow-y-auto">
          {options.map((option) => {
            const isSelected = reasons.includes(option);
            return (
              <div key={option} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => toggleReason(option)}
                  className={`w-full h-11  py-2.5  rounded-3xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.30)] flex justify-center items-center overflow-hidden text-lg font-semibold border-2 text-[#325C77] ${
                    isSelected ? "bg-[#cee4ae]" : ""
                  }`}
                >
                  {option}
                </button>
                {option === "Other" && isSelected && (
                  <textarea
                    rows={3}
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
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
