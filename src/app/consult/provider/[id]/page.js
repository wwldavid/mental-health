"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import ProviderDetailCard from "@/components/ProviderDetailCard";
import Navbar from "@/components/Navbar";

export default function ProviderDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    fetch(`/api/providers/${id}`)
      .then((res) => res.json())
      .then((data) => setProvider(data))
      .catch(console.error);
  }, [id]);

  return (
    <div className="h-screen flex flex-col p-4 bg-[url('/provider_bg5.webp')] bg-cover bg-center">
      {/* 一定会渲染 */}
      <Upperbar title="Session" />

      {/* 根据 provider 是否加载完 决定显示 */}
      {provider ? (
        <ProviderDetailCard
          provider={provider}
          onMessage={async () => {
            try {
              const res = await fetch("/api/chats/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ peerId: provider.user.id }),
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
          }}
          onBook={() => router.push(`/consult/provider/${id}/book`)}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>加载中…</p>
        </div>
      )}

      <Navbar />
    </div>
  );
}
