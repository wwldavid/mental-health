"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step5() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#325C77] px-4 pt-9 pb-3 rounded-b-xl flex justify-between items-center shadow-md">
        <button onClick={() => router.back()}>
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col mt-20 items-center max-w-md w-full mx-auto space-y-14">
        <p className="indent-6 text-lg text-gray-800 font-medium">
          You have taken a meaningful step, and your presence here is a sign of
          strength. <br />
          <span className="block indent-6">
            Remember: it is always okay to reach out.
          </span>
        </p>
      </div>
      <div className="fixed bottom-5 left-0 w-full  p-4 ">
        <button
          onClick={() => {
            localStorage.setItem("onboardingComplete", "true");
            router.push("/home");
          }}
          className="bg-[#EAD098] text-gray-800 py-3 rounded-xl font-semibold w-full hover:opacity-90 transition"
        >
          Begin
        </button>
      </div>
    </div>
  );
}
