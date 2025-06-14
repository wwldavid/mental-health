"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Upperbar from "@/components/Upperbar";

export default function ChatListPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 已登录才拉后端数据
  useEffect(() => {
    if (status === "authenticated") {
      fetchChats();
    }
  }, [filter, status]);

  async function fetchChats() {
    const res = await fetch(`/api/chats?userId=${userId}&filter=${filter}`);
    const data = await res.json();
    setChats(data);
  }

  // 🔴 1) loading 状态
  if (status === "loading") {
    return <p className="p-4 text-center">Loading…</p>;
  }

  // 🔴 2) 未认证：显示提示并提供跳转
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#E9E9E9]">
        <p className="mb-6 text-lg">请先登录或注册，以开始与咨询师Chat。</p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/sign-in")}
            className="px-4 py-2 bg-[#a4e2c6] text-white rounded"
          >
            登录
          </button>
          <button
            onClick={() => router.push("/sign-up")}
            className="px-4 py-2 bg-[#66c29a] text-white rounded"
          >
            注册
          </button>
        </div>
      </div>
    );
  }

  // 🔴 3) 已认证：正常渲染后端返回的 chats 列表（此时包含三位咨询师的会话）
  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      <Upperbar title="My Chat" />

      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mt-28 mb-4"
      />

      <div className="flex gap-4 mb-4">
        <button
          className={filter === "all" ? "font-bold" : ""}
          onClick={() => setFilter("all")}
        >
          All Messages
        </button>
        <button
          className={filter === "unread" ? "font-bold" : ""}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
      </div>

      <ul>
        {chats
          .filter((chat) =>
            chat.user.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <li
              key={chat.id}
              onClick={() => router.push(`/chat/${chat.id}`)}
              className="flex items-center p-2 border-b cursor-pointer hover:bg-gray-100"
            >
              <Image
                src={chat.user.image || "/default-avatar.png"}
                alt={chat.user.name}
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <div>
                <div className="font-bold">{chat.user.name}</div>
                <div className="text-gray-500 text-sm">{chat.lastMessage}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
