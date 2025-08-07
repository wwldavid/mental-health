"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { X } from "lucide-react";

export default function EditEntry() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/solution/self-compassion/entries/${id}`)
      .then((res) => res.json())
      .then((e) => {
        setEntry(e);
        setContent(e.content);
      });
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`/api/solution/self-compassion/entries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    router.push("/solution/self-compassion");
    router.refresh();
  };

  const handleDelete = async () => {
    await fetch(`/api/solution/self-compassion/entries/${id}`, {
      method: "DELETE",
    });
    router.push("/solution/self-compassion");
    router.refresh();
  };

  if (!entry) return <div>Loading...</div>;
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Self compassion</h2>

      {/* 卡片 */}
      <div className="p-4 bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.50)] ">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(entry.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-6 h-6 bg-[#4782A9] rounded flex items-center justify-center"
          >
            <X className="text-white" size={16} />
          </button>
        </div>

        {/* 可编辑内容 */}
        <div className="relative">
          <textarea
            className="w-full min-h-48 mt-2 p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <span className="absolute bottom-2 right-2 text-neutral-700 text-sm font-semibold">
            {entry.category.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* 更新按钮 */}
      <div className="fixed bottom-20 left-0 w-full p-4">
        <button
          onClick={handleUpdate}
          className="flex items-center justify-center w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
        >
          Update Entry
        </button>
      </div>

      {/* 删除确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80">
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
