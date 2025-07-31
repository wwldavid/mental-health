// src/app/solution/gratitude/new/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";

export default function NewGratitudeEntryPage() {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!content.trim()) return;
    await fetch("/api/gratitude-entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    router.push("/solution/gratitude");
    router.refresh();
  };

  return (
    <div className="mt-10 px-4 text-neutral-700">
      <h2 className="text-xl font-semibold">Gratitude Practice</h2>

      <div className="relative mt-4">
        <textarea
          className="w-full h-56 p-2 border rounded-lg shadow"
          placeholder="What’s something you are grateful for today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={() => {
            /* TODO: 可以接入语音输入 */
          }}
          className="absolute bottom-4 right-1 w-8 h-8 bg-[#4782A9] rounded flex items-center justify-center mr-2"
        >
          <Mic size={16} className="text-white" />
        </button>
      </div>
      <div className="fixed bottom-20 left-0 w-full p-4">
        <button
          onClick={handleSave}
          className="flex items-center justify-center w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
          disabled={!content.trim()}
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}
