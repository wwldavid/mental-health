// src/app/journal/[id]/edit/page.jsx

"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import { X, Mic, Image as ImgIcon } from "lucide-react";

const COLORS = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa"];

export default function JournalEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [content, setContent] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  // 初次加载，获取已有数据
  useEffect(() => {
    fetch(`/api/diary/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEntry(data);
        setContent(data.content);
        setColor(data.color);
      });
  }, [id]);

  // 提交更新
  const handleUpdate = async () => {
    await fetch(`/api/diary/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, color }),
    });
    router.push(`/journal/${id}`);
  };

  if (!entry) {
    return <p>Loading…</p>;
  }

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      <Upperbar title="Journal" />

      <div className="flex justify-between items-center mt-28 mb-4 w-full h-9 p-2 mx-auto">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">
            {new Date(entry.createdAt).toLocaleDateString()}
          </span>
          <span
            className="w-4 h-4 rounded"
            style={{ backgroundColor: color }}
          />
        </div>
        <button
          onClick={() => router.back()}
          className="w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="p-2 space-y-4 ">
        <p className="text-sm text-gray-600">What colour feels like today?</p>
        {/* 颜色选择 */}
        <div className="flex justify-center space-x-2">
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

        {/* 日记编辑区 */}
        <div className="w-full h-96 bg-zinc-300 rounded-2xl p-4 relative">
          <textarea
            className="w-full h-full bg-transparent resize-none outline-none"
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
          onClick={handleUpdate}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Update Entry
        </button>
      </div>

      <Navbar mobile={false} />
    </div>
  );
}
