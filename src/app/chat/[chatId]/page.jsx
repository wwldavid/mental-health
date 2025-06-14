"use client";

import Upperbar from "@/components/Upperbar";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function ChatDetailPage() {
  // 获取当前登录用户的 session
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  // 获取当前聊天的 chatId
  const { chatId } = useParams();

  // 本地状态：消息列表和输入框内容
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  // 拉取消息的函数
  const fetchMessages = useCallback(async () => {
    if (!chatId) return;
    try {
      const res = await fetch(`/api/messages?chatId=${chatId}`);
      if (!res.ok) {
        console.error("拉取消息失败：", await res.text());
        return;
      }
      const data = await res.json();
      setMessages(data);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("拉取消息出错：", error);
    }
  }, [chatId]);

  // 初次加载和定时刷新
  useEffect(() => {
    fetchMessages();
    const iv = setInterval(fetchMessages, 3000);
    return () => clearInterval(iv);
  }, [fetchMessages]);

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!userId) {
      console.error("未获取到用户 ID，无法发送消息");
      return;
    }

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          senderId: userId,
          content: input.trim(),
        }),
      });
      if (!res.ok) {
        console.error("发送失败：", await res.text());
        return;
      }
      // 清空输入框，并立即刷新消息列表
      setInput("");
      await fetchMessages();
    } catch (error) {
      console.error("发送消息出错：", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      {/* 顶部导航栏 */}
      <Upperbar title="My Chat" />

      {/* 消息列表区，自动滚动到底部 */}
      <div className=" mt-28 mb-4 px-2">
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

      {/* 输入框和发送按钮 */}
      <div className="flex px-2 pb-4">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="输入消息..."
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
