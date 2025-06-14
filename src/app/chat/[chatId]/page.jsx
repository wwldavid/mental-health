"use client";

import Upperbar from "@/components/Upperbar";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

export default function ChatDetailPage({ userId }) {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  // 抽取拉消息函数
  const fetchMessages = useCallback(async () => {
    if (!chatId) return;
    const res = await fetch(`/api/messages?chatId=${chatId}`);
    const data = await res.json();
    setMessages(data);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatId]);

  // 初次和定时拉取
  useEffect(() => {
    fetchMessages();
    const iv = setInterval(fetchMessages, 3000);
    return () => clearInterval(iv);
  }, [fetchMessages]);

  // 发送后立刻再拉一次
  const sendMessage = async () => {
    if (!input.trim()) return;
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, senderId: userId, content: input }),
    });
    if (res.ok) {
      setInput("");
      await fetchMessages();
    } else {
      console.error("发送失败:", await res.text());
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      <Upperbar title="My Chat" />
      <div className="overflow-y-auto mt-28 mb-4 px-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div className="inline-block px-3 py-2 rounded bg-lime-300 max-w-xs">
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex px-2 pb-4">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-white text-black rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
