"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step2() {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleNext = async () => {
    if (!gender) {
      setError("请选择一个性别身份");
      return;
    }
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genderIdentity: gender }),
    });
    router.push("/onboarding/step3");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mt-10 px-4 h-12 mb-6 bg-[#EAD098] rounded-bl-2xl rounded-br-2xl">
        <button onClick={() => router.back()} className="text-gray-600 text-xl">
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-gray-600">Step 2 of 5</span>
      </div>
      <h2 className="text-2xl font-semibold mb-4">
        What is your gender identity?
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="space-y-2">
        {["Woman", "Man", "Non-binary", "Other"].map((opt) => (
          <label key={opt} className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value={opt}
              onChange={(e) => setGender(e.target.value)}
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
