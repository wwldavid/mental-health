// src/app/journal/page.jsx
"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function JournalListPage() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/diary")
      .then((res) => res.json())
      .then(setEntries);
  }, []);

  const filtered = entries.filter((e) =>
    e.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      <Upperbar title="Journal" />

      {/* 搜索框 */}
      <div className="flex mt-28 mb-4 w-full h-9 p-2  bg-neutral-50/95 rounded-[10px] mx-auto">
        <Search className="text-gray-400  mr-2" />
        <input
          className="flex-1 focus:outline-none bg-neutral-50/95"
          placeholder="Find Entries"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 列表 */}
      <div className="h-[60vh] overflow-y-auto px-4 py-2 space-y-2">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            onClick={() => router.push(`/journal/${entry.id}`)}
            className="p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: entry.color }}
              />
            </div>
            <p
              className="text-gray-800 overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {entry.content}
            </p>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t flex justify-between items-center">
        <button
          className=" w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={() => router.push("/journal/new")}
        >
          New Entry
        </button>
      </div>

      <Navbar mobile={false} />
    </div>
  );
}
