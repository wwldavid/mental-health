"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step2() {
  const router = useRouter();
  const buttonStyle =
    "w-full max-w-xs bg-[#3a5b52] text-white py-2 px-4 rounded mb-4 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200";

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => router.back()} className="text-gray-600 text-xl">
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-gray-600">Step 2 of 4</span>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        What is your gender identity?
      </h2>

      <form className="space-y-4">
        {[
          "Woman",
          "Man",
          "Non-binary",
          "Trans woman / Trans man",
          "Genderqueer / Agender",
          "Other",
        ].map((label, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <input type="checkbox" id={label} />
            <label htmlFor={label}>{label}</label>
          </div>
        ))}

        <button
          type="button"
          onClick={() => router.push("/onboarding/step3")}
          className={buttonStyle}
        >
          Next
        </button>
      </form>
    </div>
  );
}
