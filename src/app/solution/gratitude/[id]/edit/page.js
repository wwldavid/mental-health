// src/app/solution/gratitude/[id]/edit/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Edit2 } from "lucide-react";

export default function EditGratitudeEntry({ params }) {
  const { id } = params;
  const router = useRouter();
  const [entry, setEntry] = useState({ content: "", createdAt: "" });
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  // 1. 加载现有内容
  useEffect(() => {
    fetch(`/api/gratitude-entries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEntry(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="px-4 mt-10">Loading...</div>;

  // 2. 提交更新
  const handleUpdate = async () => {
    await fetch(`/api/gratitude-entries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: entry.content }),
    });
    router.push(`/solution/gratitude/${id}`);
    router.refresh();
  };

  // 3. 删除条目
  const handleDelete = async () => {
    await fetch(`/api/gratitude-entries/${id}`, { method: "DELETE" });
    router.push("/solution/gratitude");
    router.refresh();
  };

  return (
    <div className="mt-10 px-4 text-neutral-700">
      <h2 className="text-xl font-semibold">Gratitude Practice</h2>

      {/* 日期 + 按钮栏 */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-lg font-bold">
          {new Date(entry.createdAt).toISOString().split("T")[0]}
        </div>
        <div className="flex gap-2">
          {/* 编辑按钮高亮黄色 */}
          <button className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
            <Edit2 size={16} className="text-white" />
          </button>
          {/* 删除按钮 */}
          <button
            onClick={() => setShowConfirm(true)}
            className="w-8 h-8 bg-[#4782A9] rounded flex items-center justify-center"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* 可编辑内容区域 */}
      <textarea
        className="w-full h-56 mt-4 p-2 border rounded-lg shadow"
        value={entry.content}
        onChange={(e) => setEntry({ ...entry, content: e.target.value })}
      />

      {/* 更新按钮 */}
      <div className="fixed bottom-20 left-0 w-full p-4">
        <button
          onClick={handleUpdate}
          className="flex items-center justify-center w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow"
        >
          Update Entry
        </button>
      </div>

      {/* 删除确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white/50 p-4 rounded-lg shadow-lg w-80">
            <p className="text-lg font-bold">
              Are you sure you want to delete this entry? This action cannot be
              undone.
            </p>
            <div className="mt-3 flex justify-around gap-2">
              <button
                onClick={handleDelete}
                className="px-8 py-1 bg-[#DD7373] text-white rounded-3xl shadow"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-8 py-1 bg-[#4782A9] text-white rounded-3xl shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
