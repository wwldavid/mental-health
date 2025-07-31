// src/app/solution/gratitude/[id]/EntryDetailClient.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Edit2, X } from "lucide-react";

export default function EntryDetailClient({ id }) {
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetch(`/api/gratitude-entries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEntry(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!entry.id) return <div>Entry not found.</div>;

  const handleDelete = async () => {
    await fetch(`/api/gratitude-entries/${id}`, { method: "DELETE" });
    router.push("/solution/gratitude");
    router.refresh();
  };

  return (
    <div className="mt-10 px-4 text-neutral-700">
      <h2 className="text-xl font-semibold ">Gratitude Practice</h2>
      <div className="flex justify-between items-center mt-4">
        <div className="text-lg font-bold">
          {new Date(entry.createdAt).toISOString().split("T")[0]}
        </div>
        <div className="flex gap-2">
          {/* 编辑按钮，跳到 edit 页面 */}
          <button
            onClick={() => router.push(`/solution/gratitude/${id}/edit`)}
            className="w-8 h-8 bg-[#4782A9] rounded flex items-center justify-center"
          >
            <Edit2 size={16} className="text-white" />
          </button>
          {/* 删除按钮，弹出确认框 */}
          <button
            onClick={() => setShowConfirm(true)}
            className="w-8 h-8 bg-[#4782A9] rounded flex items-center justify-center"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* 完整内容 */}
      <div className="mt-4 font-normal overflow-hidden leading-7">
        {entry.content}
      </div>

      <div className="fixed bottom-20 left-0 w-full p-4">
        <button
          onClick={() => router.push("/solution/gratitude")}
          className="flex items-center justify-center w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
        >
          Back to Entries
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white/50 p-4 rounded-lg shadow-lg w-80">
            <p className="text-lg font-bold">
              Are you sure you want to delete this entry? This action cannot be
              undone.
            </p>
            <div className="mt-3 flex justify-around gap-2 text-white text-base font-bold">
              <button
                onClick={handleDelete}
                className="px-8 py-1 bg-[#DD7373] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-8 py-1 bg-[#4782A9] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
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
