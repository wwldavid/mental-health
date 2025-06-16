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
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/diary/${id}`)
      .then((res) => res.json())
      .then((data) => setEntry(data));
  }, [id]);

  if (!entry) return <p>Loading…</p>;

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
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
            className="w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
          >
            <Pencil className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => router.back()}
            className="w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="p-4 overflow-auto flex-1">
        <p className="whitespace-pre-wrap">{entry.content}</p>
      </div>

      <Navbar mobile={false} />
    </div>
  );
}
