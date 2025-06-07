"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step5() {
  const router = useRouter();

  const buttonStyle =
    "w-full max-w-xs bg-[#3a5b52] text-white py-2 px-4 rounded mb-4 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200";

  const handleBegin = () => {
    localStorage.setItem("onboardingComplete", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex  flex-col p-6">
      <div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 text-xl mb-6"
        >
          <ChevronLeft size={24} />
        </button>
        <p className=" my-28 text-lg font-medium">
          You have taken a meaningful step, and your presence here is a sign of
          strength. Remember: it is okay to reach out.
        </p>
      </div>
      <div className="pt-4">
        <button onClick={handleBegin} className={buttonStyle}>
          Begin
        </button>
      </div>
    </div>
  );
}
