"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ChatListPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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

  if (status === "loading") return <p>Loading…</p>;
  if (status === "unauthenticated") {
    router.push("/api/auth/sign-up");
    return null;
  }

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
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
                src={chat.user.avatarUrl || "/default-avatar.png"}
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
