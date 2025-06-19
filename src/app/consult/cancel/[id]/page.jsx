// src/app/consult/cancel/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function CancelSessionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [canceled, setCanceled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/sessions/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "取消失败");
      setCanceled(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 自动跳转：取消成功后 3 秒自动返回列表
  useEffect(() => {
    let timer;
    if (canceled) {
      timer = setTimeout(() => {
        router.push("/consult");
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [canceled, router]);

  // 已确认取消后的视图
  if (canceled) {
    return (
      <div className="flex flex-col h-screen bg-[#E9E9E9]">
        <Upperbar title="Session" />
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold mb-4">Cancel Session</h1>
          <p className="text-center">
            Your session has been canceled. We will be here whenever you are
            ready to reschedule.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            You will be redirected back in a few seconds.
          </p>
        </div>
        <Navbar />
      </div>
    );
  }

  // 初始确认取消视图
  return (
    <div className="flex flex-col h-screen bg-[#E9E9E9]">
      <Upperbar title="Session" />
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Cancel Session</h1>
        <p className="text-center mb-2">
          Are you sure you want to cancel this session?
        </p>
        <p className="text-center mb-6">
          If you are unable to attend, you can always reschedule the session to
          a time that is convenient for you.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="w-full max-w-xs">
          <Button
            variant="destructive"
            onClick={handleCancel}
            className="w-full mb-3"
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Cancel Session"}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/consult")}
            className="w-full"
          >
            Book Another Session
          </Button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
