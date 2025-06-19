// src/app/consult/live/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function LiveSessionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [roomUrl, setRoomUrl] = useState("");
  const [error, setError] = useState("");
  const [sendingSms, setSendingSms] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        // 拿到同一个房间 URL
        const res = await fetch("/api/create-room", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: id }),
        });
        const { url, error: roomErr } = await res.json();
        if (roomErr || !url) throw new Error(roomErr || "房间创建失败");
        setRoomUrl(url);

        // 短信里发回我们的 App 路由，让医生也能走同样的逻辑 join
        const appLink = `${window.location.origin}/consult/live/${id}`;
        const providerPhone = "+14038883609"; // TODO: 从 session 数据里拿
        setSendingSms(true);
        await fetch("/api/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: providerPhone,
            message: `您有一个新的视频会话，点击此链接加入：${appLink}`,
          }),
        });
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setSendingSms(false);
      }
    }
    init();
  }, [id]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        错误：{error}
      </div>
    );
  }
  if (!roomUrl) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">正在准备视频会话…</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      {sendingSms && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded shadow">
          正在发送会话通知…
        </div>
      )}
      <iframe
        src={roomUrl}
        allow="camera;microphone;fullscreen"
        className="w-full h-full"
      />
      <button
        className="absolute top-4 right-4 px-3 py-1 bg-white text-black rounded"
        onClick={() => router.push("/consult")}
      >
        退出
      </button>
    </div>
  );
}
