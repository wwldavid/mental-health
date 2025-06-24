// src/app/journal/new/page.jsx
"use client";
import { useState, useEffect } from "react";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Mic, Image as ImgIcon } from "lucide-react";

const COLORS = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa"];

export default function NewJournalPage() {
  const [color, setColor] = useState(COLORS[0]);
  const [content, setContent] = useState("");
  const [today, setToday] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    if (!content) return;
    await fetch("/api/diary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, isPublic: false, color }),
    });
    router.push("/journal");
  };

  // on mount, compute “today” in America/Edmonton
  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Edmonton",
    });
    setToday(formatted);
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      <Upperbar title="Journal" />

      <div className="mt-20 mb-10 w-full p-2 h-[60vh] overflow-y-auto space-y-4">
        <p className="text-base">Today is {today}</p>
        <p className="text-sm text-gray-600">What colour feels like today?</p>

        {/* 颜色选择 */}
        <div className="flex space-x-2 justify-center">
          {COLORS.map((c) => (
            <div
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded cursor-pointer border-2 ${
                color === c ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* 日记输入区 */}
        <div className="w-full h-60 bg-zinc-300 rounded-lg p-4 relative">
          <textarea
            className="w-full h-full bg-transparent resize-none outline-none"
            placeholder="What is on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="absolute bottom-2 right-2 flex space-x-2">
            <div className="p-1 bg-black rounded cursor-pointer">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div className="p-1 bg-black rounded cursor-pointer">
              <ImgIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={handleAdd}
        >
          Add Entry
        </button>
      </div>

      <Navbar mobile={false} />
    </div>
  );
}
