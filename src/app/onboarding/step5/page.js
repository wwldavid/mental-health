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
      <div className="flex justify-between items-center mt-10 px-4 h-12 mb-6 bg-[#EAD098] rounded-bl-2xl rounded-br-2xl">
        <button onClick={() => router.back()} className="text-gray-600 text-xl">
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-gray-600">Step 5 of 5</span>
      </div>
      <p className="text-center mt-28 text-lg  mb-6">
        You’ve taken a meaningful step, and your presence here is a sign of
        strength. Remember: it’s always okay to reach out.
      </p>
      <button
        onClick={handleBegin}
        className="mt-40 w-full h-11 mx-auto block bg-[#325C77] rounded-2xl text-white py-2 mb-6 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200"
      >
        Begin
      </button>
    </div>
  );
}
