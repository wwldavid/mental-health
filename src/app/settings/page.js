"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
  const [orientation, setOrientation] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const options = [
    "Profile",
    "Personalization",
    "Notifications",
    "Theme and Display",
    "Privacy and Security",
    "Language and Tone Preferences",
    "Accessibility",
    "Sound and Audio",
  ];

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">Profile and Settings</h2>
      <div className="flex-1 mt-5 max-w-md w-full mx-auto space-y-5">
        <div className="space-y-4">
          {options.map((option) => {
            const isSelected = orientation === option;
            return (
              <div key={option} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    setOrientation(option);
                    setError("");
                  }}
                  className={`w-full h-11  py-2.5  rounded-3xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.30)] flex justify-center items-center overflow-hidden text-lg font-semibold border-2 text-[#325C77] ${
                    isSelected ? "bg-[#cee4ae]" : ""
                  }`}
                >
                  {option}
                </button>
              </div>
            );
          })}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
