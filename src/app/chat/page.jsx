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

  useEffect(() => {
    if (status !== "authenticated") return;
    (async () => {
      const res = await fetch(`/api/chats?userId=${userId}&filter=${filter}`);
      setChats(await res.json());
    })();
  }, [status, userId, filter]);

  if (status === "loading") {
    return <p className="p-4 text-center">Loading…</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('/chat_bg1.png')] bg-cover bg-center">
        <p className="mb-6 text-lg">
          To start chatting with a counselor, please log in or create an
          account.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/sign-in")}
            className="px-4 py-2 bg-[#a4e2c6] text-white rounded"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/sign-up")}
            className="px-4 py-2 bg-[#66c29a] text-white rounded"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[url('/chat_bg1.png')] bg-cover bg-center">
      <Upperbar title="My Chat" />

      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-20 mb-4 w-full h-9 p-2  bg-neutral-50/95 rounded-[10px] mx-auto"
      />

      <div className="flex gap-4 mb-4">
        <button
          className="font-bold w-44 h-7 px-2 py-2.5 bg-[#4782A9] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] text-white flex justify-center items-center"
          onClick={() => setFilter("all")}
        >
          All Messages
        </button>
        <button
          className="font-bold w-44 h-7 px-2 py-2.5 bg-[#4782A9] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] text-white flex justify-center items-center"
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
            <>
              <li
                key={chat.id}
                onClick={() => router.push(`/chat/${chat.id}`)}
                className="flex items-center p-2 border-b border-b-[#4782A9] cursor-pointer hover:bg-gray-100 mt-5"
              >
                <Image
                  src={chat.user.image || "/default-avatar.png"}
                  alt={chat.user.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <div className="font-bold">{chat.user.name}</div>
                  <div className="text-gray-500 text-sm">
                    {chat.lastMessage}
                  </div>
                </div>
              </li>
            </>
          ))}
      </ul>
    </div>
  );
}
