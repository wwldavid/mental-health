// src/app/consult/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import Calendar from "@/components/Calendar";
import ProviderCard from "@/components/ProviderCard";
import dayjs from "dayjs";
import { useSession, signIn } from "next-auth/react";
import { Search } from "lucide-react";

export default function ConsultPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState("mine");
  const [sessions, setSessions] = useState([]);
  const [providers, setProviders] = useState([]);

  const now = new Date();
  const [displayYear, setDisplayYear] = useState(now.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(now.getMonth() + 1);

  const startChatAndGo = async (peerUserId) => {
    try {
      const res = await fetch("/api/chats/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peerId: peerUserId }),
      });
      if (!res.ok) {
        console.error("start chat failed:", await res.text());
        return;
      }
      const { chatId } = await res.json();
      router.push(`/chat/${chatId}`);
    } catch (e) {
      console.error("start chat error:", e);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") signIn();
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    if (mode === "mine") {
      fetch("/api/sessions")
        .then((res) => res.json())
        .then((data) => {
          console.log("Loaded sessions:", data);
          setSessions(Array.isArray(data) ? data : []);

          if (data.length > 0) {
            const firstDate = new Date(data[0].scheduledAt);
            setDisplayYear(firstDate.getFullYear());
            setDisplayMonth(firstDate.getMonth() + 1);
          } else {
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
  }, [mode, status]);

  const prevMonth = () => {
    let m = displayMonth - 1,
      y = displayYear;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    setDisplayMonth(m);
    setDisplayYear(y);
  };
  const nextMonth = () => {
    let m = displayMonth + 1,
      y = displayYear;
    if (m > 12) {
      m = 1;
      y += 1;
    }
    setDisplayMonth(m);
    setDisplayYear(y);
  };

  if (status !== "authenticated") {
    return <p>loading...</p>;
  }

  return (
    <div className="h-screen flex flex-col p-4">
      <Upperbar title="Session" />

      <div className="flex mt-28 mb-2 w-full border-b border-gray-600">
        <button
          onClick={() => setMode("mine")}
          className={`flex-1 py-2 text-center ${
            mode === "mine" ? "border-b-2 border-gray-600/50 " : "border-none"
          }`}
        >
          My Support Providers
        </button>
        <button
          onClick={() => setMode("find")}
          className={`flex-1 py-2 text-center ${
            mode === "find" ? "border-b-2 border-gray-600/50" : "border-none"
          }`}
        >
          Find Support Providers
        </button>
      </div>

      <div className="flex-1 flex-col items-center gap-4 mt-2 pb-20 overflow-y-auto">
        {mode === "mine" ? (
          <div className="w-full h-[67vh] overflow-y-auto">
            <div className=" p-1 pt-3 border rounded-lg border-neutral-700">
              <div className="flex items-center gap-4">
                <button onClick={prevMonth} className="px-2">
                  ‹
                </button>
                <span className="font-medium">
                  {dayjs(`${displayYear}-${displayMonth}-01`).format(
                    "MMMM YYYY"
                  )}
                </span>
                <button onClick={nextMonth} className="px-2">
                  ›
                </button>
              </div>

              <Calendar
                year={displayYear}
                month={displayMonth}
                sessions={sessions}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {sessions.length > 0 ? (
                sessions.map((s) => (
                  <ProviderCard
                    key={s.id}
                    mode="mine"
                    session={s}
                    onMessage={() => startChatAndGo(s?.provider?.user?.id)}
                    onJoin={() => router.push(`/consult/live/${s.id}`)}
                    onCancel={() => router.push(`/consult/cancel/${s.id}`)}
                    onBook={() =>
                      router.push(`/consult/provider/${s.provider.id}/book`)
                    }
                  />
                ))
              ) : (
                <p className="text-center py-4">No upcoming appointments</p>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-[67vh] overflow-y-auto">
            <div className="w-full mb-4 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <input
                type="search"
                placeholder="Search"
                className="w-full h-9 pl-10 pr-3 rounded border "
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
                  onView={() => router.push(`/consult/provider/${p.id}`)}
                  onBook={() => router.push(`/consult/provider/${p.id}/book`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
}
