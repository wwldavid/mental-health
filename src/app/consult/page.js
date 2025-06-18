// src/app/consult/page.js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import Calendar from "@/components/Calendar";
import ProviderCard from "@/components/ProviderCard";

export default function ConsultPage() {
  const router = useRouter();
  const [mode, setMode] = useState("mine"); // 'mine' or 'find'
  const [sessions, setSessions] = useState([]);
  const [providers, setProviders] = useState([]);

  const now = new Date();
  const [displayYear, setDisplayYear] = useState(now.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(now.getMonth() + 1);

  useEffect(() => {
    if (mode === "mine") {
      fetch("/api/sessions")
        .then((res) => res.json())
        .then((data) => {
          console.log("Loaded sessions:", data);
          setSessions(data);

          // 如果有预约，就自动跳到第一条 session 的月份
          if (data.length > 0) {
            const firstDate = new Date(data[0].scheduledAt);
            setDisplayYear(firstDate.getFullYear());
            setDisplayMonth(firstDate.getMonth() + 1);
          } else {
            // 没有预约，恢复到当前
            setDisplayYear(now.getFullYear());
            setDisplayMonth(now.getMonth() + 1);
          }
        })
        .catch((err) => console.error("Failed to load sessions", err));
    } else {
      fetch("/api/providers")
        .then((res) => res.json())
        .then((data) => setProviders(data))
        .catch((err) => console.error("Failed to load providers", err));
    }
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      <Upperbar title="Session" />

      {/* 切换按钮组 */}
      <div className="flex mt-28 mb-2 w-full">
        <button
          onClick={() => setMode("mine")}
          className={`flex-1 py-2 text-center ${
            mode === "mine"
              ? "border-none"
              : "border-r border-b border-gray-600 "
          }`}
        >
          My Support Providers
        </button>
        <button
          onClick={() => setMode("find")}
          className={`flex-1 py-2 text-center ${
            mode === "find"
              ? "border-none"
              : "border-l border-b border-gray-600"
          }`}
        >
          Find Support Providers
        </button>
      </div>

      {/* 主体内容 */}
      <div className="flex flex-col items-center gap-4 mt-4">
        {mode === "mine" ? (
          <>
            <Calendar
              year={displayYear}
              month={displayMonth}
              sessions={sessions}
            />
            <div className="flex flex-wrap justify-center gap-4">
              {sessions.map((s) => (
                <ProviderCard
                  key={s.id}
                  mode="mine"
                  session={s}
                  onJoin={() => router.push(`/consult/live/${s.id}`)}
                  onCancel={() => router.push(`/consult/cancel/${s.id}`)}
                  onBook={() =>
                    router.push(`/consult/provider/${s.provider.id}/book`)
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-96">
              <input
                type="search"
                placeholder="Search"
                className="w-full h-9 px-3 rounded border"
                onChange={(e) => {
                  const query = e.target.value.toLowerCase();
                  setProviders((prev) =>
                    prev.filter((p) =>
                      p.user.name.toLowerCase().includes(query)
                    )
                  );
                }}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {providers.map((p) => (
                <ProviderCard
                  key={p.id}
                  mode="find"
                  provider={p}
                  onMessage={() => router.push(`/consult/provider/${p.id}`)}
                  onBook={() => router.push(`/consult/provider/${p.id}/book`)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Navbar />
    </div>
  );
}
