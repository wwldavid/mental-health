"use client";

import Upperbar from "@/components/Upperbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Send } from "lucide-react";

export default function ChatDetailPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { chatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const fetchMessages = useCallback(async () => {
    if (!chatId) return;
    try {
      const res = await fetch(`/api/messages?chatId=${chatId}`);
      if (!res.ok) {
        console.error("fetch message failed:", await res.text());
        return;
      }
      const data = await res.json();
      setMessages(data);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("fetch message failed:", error);
    }
  }, [chatId]);

  useEffect(() => {
    fetchMessages();
    const iv = setInterval(fetchMessages, 3000);
    return () => clearInterval(iv);
  }, [fetchMessages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!userId) {
      console.error("without obtaining user id, could not send message");
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

      setInput("");
      await fetchMessages();
    } catch (error) {
      console.error("sending message error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[url('/chat_bg2.png')] bg-cover bg-center">
      <Upperbar title="My Chat" />

      <div className=" mt-28 mb-4 px-2 max-h-[60vh] overflow-y-auto">
        <div className="  px-4 py-2">
          {messages.map((msg) => {
            const isMe = msg.senderId === userId;
            return (
              <div
                key={msg.id}
                className={`mb-2 flex items-start ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {!isMe && (
                  <Image
                    src={msg.sender.image || "/default-avatar.png"}
                    alt={msg.sender.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                )}
                <div
                  className={`inline-block px-3 py-2 max-w-xs rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.50)] ${
                    isMe ? "bg-[#ffffff]" : "bg-[#EAD098]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
      </div>

      {/* 输入框和发送按钮 */}
      <div className="flex px-2 ">
        <input
          className="flex-1 p-2 border rounded-2xl bg-"
          placeholder="write your message ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-[#f6f6f6f6]/50 text-black rounded-2xl hover:bg-[#f6f6f6]    hover:shadow-md transition duration-150 ease-in-out"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
