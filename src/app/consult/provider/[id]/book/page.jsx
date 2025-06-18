// src/app/consult/provider/[id]/book/page.jsx
"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import { Button } from "@/components/ui/button";

export default function ProviderBookPage() {
  const router = useRouter();
  const { id } = useParams();
  // 静态示例时间表，后续可改为从 API 获取
  const slotsByDate = {
    "Thursday, August 8": ["10:00am", "12:00pm", "2:00pm", "4:00pm"],
    "Tuesday, August 12": ["10:00am", "12:00pm", "2:00pm", "4:00pm"],
    "Monday, August 18": ["10:00am", "12:00pm", "2:00pm", "4:00pm"],
    "Thursday, August 21": ["10:00am", "12:00pm", "2:00pm", "4:00pm"],
  };
  const [selected, setSelected] = useState(null);
  const toggle = (date, time) => {
    const key = `${date}|${time}`;
    setSelected(selected === key ? null : key);
  };

  const handleBook = async () => {
    if (!selected) return;
    const [date, time] = selected.split("|");
    const resp = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId: id, date, time }),
    });
    console.log("POST /api/sessions status:", resp.status);
    const created = await resp.json();
    console.log("Created session:", created);
    // 把 date 和 time 编码后当作 query 传给确认页
    const datetimeParam = encodeURIComponent(`${date}, ${time}`);
    router.push(
      `/consult/provider/${id}/book/confirm?datetime=${datetimeParam}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      <Upperbar title="Session" />
      <h2 className="mt-28 mb-4 text-lg font-semibold">
        Reach out to Provider No.{id}
      </h2>

      <div className="mb-12">
        {Object.entries(slotsByDate).map(([date, times]) => (
          <div key={date} className="mb-1">
            <div className="text-center font-medium mt-6">{date}</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {times.map((t) => {
                const key = `${date}|${t}`;
                const isSel = selected === key;
                return (
                  <button
                    key={t}
                    className={`w-44 h-7 rounded border ${
                      isSel
                        ? "bg-black text-white border-black"
                        : "border-gray-600 text-black"
                    }`}
                    onClick={() => toggle(date, t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleBook}>Book Session</Button>
    </div>
  );
}
