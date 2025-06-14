"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step5() {
  const router = useRouter();
  const handleBegin = () => {
    localStorage.setItem("onboardingComplete", "true");
    router.push("/"); // 或者 router.push("/openai-suggest")
  };

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="flex items-center mt-10 mb-6">
        <button onClick={() => router.back()} className="text-gray-600 text-xl">
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-gray-600">Step 5 of 5</span>
      </div>
      <p className="text-center text-lg mb-6">
        You’ve taken a meaningful step, and your presence here is a sign of
        strength. Remember: it’s always okay to reach out.
      </p>
      <button
        onClick={handleBegin}
        className="w-full bg-black text-white py-2 rounded"
      >
        Begin
      </button>
    </div>
  );
}
