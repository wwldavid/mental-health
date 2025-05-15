"use client";
import { useEffect, useRef } from "react";
import DailyIframe from "@daily-co/daily-js";

export default function DoctorVideoChat({ roomUrl }) {
  const callFrameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 如果没有房间 URL，则不执行任何操作
    if (!roomUrl) return;

    // 清理函数，用于销毁现有的 callFrame
    const cleanup = () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy();
        callFrameRef.current = null;
      }
    };

    // 先清理任何现有的实例，以避免重复创建
    cleanup();

    // 创建容器元素（如果尚不存在）
    if (!containerRef.current) return;

    // 创建新的 Daily iframe 实例
    try {
      callFrameRef.current = DailyIframe.createFrame({
        iframeStyle: {
          position: "relative",
          width: "100%",
          height: "500px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        },
      });

      // 加入房间
      callFrameRef.current.join({ url: roomUrl });

      // 将 iframe 添加到页面
      containerRef.current.appendChild(callFrameRef.current.iframe());
    } catch (error) {
      console.error("Error creating Daily iframe:", error);
    }

    // 在组件卸载或房间 URL 更改时清理
    return cleanup;
  }, [roomUrl]); // 仅在 roomUrl 改变时重新执行

  return <div ref={containerRef} className="mt-4" />;
}
