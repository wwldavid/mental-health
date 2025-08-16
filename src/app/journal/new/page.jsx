// src/app/journal/new/page.jsx
"use client";
import { useState, useEffect } from "react";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Mic, Image as ImgIcon } from "lucide-react";

const COLORS = ["#50A570", "#509FAA", "#B29124", "#EB7114", "#DD7373"];

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
    <div className="min-h-screen flex flex-col p-4 bg-[url('/journal_bg2.png')] bg-cover bg-center">
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
        <div className="w-full h-60 bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.50)] p-4 relative">
          <textarea
            className="w-full h-full bg-transparent resize-none outline-none"
            placeholder="What is on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="absolute bottom-2 right-2 flex space-x-2">
            <div className="p-1 bg-[#4782A9] rounded cursor-pointer">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div className="p-1 bg-[#4782A9] rounded cursor-pointer">
              <ImgIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 w-full p-4">
        <button
          className="w-full bg-[#4782A9] text-white py-2 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
          onClick={handleAdd}
        >
          Add Entry
        </button>
      </div>

      <Navbar mobile={false} />
    </div>
  );
}
