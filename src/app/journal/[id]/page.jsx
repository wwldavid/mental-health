// src/app/journal/[id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import { Pencil, X } from "lucide-react";

export default function JournalDetail() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/diary/${id}`)
      .then((res) => res.json())
      .then((data) => setEntry(data));
  }, [id]);

  const handleDelete = async () => {
    await fetch(`/api/diary/${id}`, { method: "DELETE" });
    router.push("/journal");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (!entry) return <p>Loading…</p>;

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[url('/journal_bg3.png')] bg-cover bg-center">
      <Upperbar title="Journal" />

      <div className="mt-28 mb-4 w-full p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">
            {new Date(entry.createdAt).toLocaleDateString()}
          </span>
          <span
            className="w-4 h-4 rounded"
            style={{ backgroundColor: entry.color }}
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/journal/${id}/edit`)}
            className="w-8 h-8 bg-[#4782A9] rounded flex items-center justify-center cursor-pointer"
          >
            <Pencil className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-8 h-8 bg-red-400 rounded flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="p-4 overflow-auto flex-1">
        <p className="whitespace-pre-wrap">{entry.content}</p>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-red-300/20 flex items-center justify-center">
          <div className="bg-white p-3 rounded-lg shadow-lg max-w-sm w-4/5">
            <p className="mb-4 text-center">
              Are you sure you want to delete this entry?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-2 py-1 border rounded bg-[#4782A9] text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-2 py-1 bg-red-400 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar mobile={false} />
    </div>
  );
}
