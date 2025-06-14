"use client";

import Upperbar from "@/components/Upperbar";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function ChatDetailPage({ userId }) {
  const router = useRouter();
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  // 拉新消息并滚到底部
  useEffect(() => {
    if (!chatId) return;
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?chatId=${chatId}`);
      const data = await res.json();
      setMessages(data);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    fetchMessages();
    const iv = setInterval(fetchMessages, 3000);
    return () => clearInterval(iv);
  }, [chatId]);

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim()) return;
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, senderId: userId, content: input }),
    });
    setInput("");
  };

  return (
    <div className=" min-h-screen flex flex-col p-4  bg-[#E9E9E9]">
      <Upperbar title="My Chat" />
      <div className="overflow-y-auto flex-1 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div className="inline-block px-3 py-2 rounded bg-gray-200 max-w-xs">
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
