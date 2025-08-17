// src/app/consult/provider/[id]/book/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Upperbar from "@/components/Upperbar";

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
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    fetch(`/api/providers/${id}`)
      .then((res) => res.json())
      .then((data) => setProvider(data))
      .catch((err) => {
        console.error("Failed to load provider:", err);
      });
  }, [id]);
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
    <div className="min-h-svh flex flex-col p-4 bg-[url('/provider_bg3.png')] bg-cover bg-center">
      <Upperbar title="Session" />

      <div className="flex-1 p-1 overflow-y-auto mb-32">
        <h2 className="mt-16 text-lg font-semibold">
          {provider ? `Connect with ${provider.user.name}` : "Loading..."}
        </h2>

        <div>
          {Object.entries(slotsByDate).map(([date, times]) => (
            <div
              key={date}
              className="w-full h-28  bg-white/50 rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.50)]"
            >
              <div className="text-center font-medium mt-5 pt-1">{date}</div>
              <div className="grid grid-cols-2 gap-2 mt-2 px-4">
                {times.map((t) => {
                  const key = `${date}|${t}`;
                  const isSel = selected === key;
                  return (
                    <button
                      key={t}
                      className={`w-36 h-7 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] flex justify-center items-center ${
                        isSel
                          ? "bg-[#EAD098] text-black "
                          : "bg-[#4782A9] text-white "
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
      </div>

      <div className="fixed bottom-20 left-0 w-full p-4">
        <button
          className="w-full h-11 bg-[#4782A9] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] inline-flex justify-center items-center overflow-hidden text-center text-white text-xl font-semibold"
          onClick={handleBook}
        >
          Book Session
        </button>
      </div>
    </div>
  );
}
