"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step4() {
  const router = useRouter();

  const buttonStyle =
    "w-full max-w-xs bg-[#3a5b52] text-white py-2 px-4 rounded mb-4 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200";

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

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* 顶部标题和引导 */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 text-xl"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-sm text-gray-600">Step 4 of 4</span>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          What brings you here today?
        </h2>
      </div>

      {/* 选项滚动区域，设置最大高度和滚动 */}
      <div className="max-h-[400px] overflow-y-auto pr-2 mb-6">
        <form className="space-y-4">
          {options.map((label, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input type="checkbox" id={label} />
              <label htmlFor={label}>{label}</label>
            </div>
          ))}
        </form>
      </div>

      {/* 固定底部按钮 */}
      <div>
        <button
          type="button"
          onClick={() => router.push("/onboarding/step5")}
          className={buttonStyle}
        >
          Next
        </button>
      </div>
    </div>
  );
}
