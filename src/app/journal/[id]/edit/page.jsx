// src/app/journal/[id]/edit/page.jsx

"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import { X, Mic, Image as ImgIcon } from "lucide-react";

const COLORS = ["#50A570", "#509FAA", "#B29124", "#EB7114", "#DD7373"];

export default function JournalEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [content, setContent] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [showConfirm, setShowConfirm] = useState(false);

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
    <div className="min-h-screen flex flex-col p-4 bg-[url('/journal_bg3.png')] bg-cover bg-center">
      <Upperbar title="Journal" />

      <div className="flex justify-between items-center mt-20 mb-4 w-full h-9 p-2 mx-auto">
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
          className="w-8 h-8 bg-[#4782A9] rounded flex items-center justify-center cursor-pointer"
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
        <div className="w-full h-96 bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.50)] rounded-2xl p-4 relative">
          <textarea
            className="w-full h-full bg-transparent resize-none outline-none"
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
          onClick={() => setShowConfirm(true)}
          className="w-full bg-[#4782A9] text-white py-2 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
        >
          Update Entry
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-red-300/20 flex items-center justify-center">
          <div className="bg-white p-3 rounded-lg shadow-lg max-w-sm w-4/5">
            <p className="mb-4 text-center">
              Are you sure you want to update this entry?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-2 py-1 border rounded bg-[#4782A9] text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdate();
                  setShowConfirm(false);
                }}
                className="px-2 py-1 bg-red-400 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
