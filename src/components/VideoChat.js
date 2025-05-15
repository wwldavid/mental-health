"use client";
import { useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";

export default function VideoChat({ roomUrl }) {
  const callFrameRef = useRef(null);
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const initializationAttempted = useRef(false);

  useEffect(() => {
    // If no room URL or already initialized/attempted, don't proceed
    if (!roomUrl || initializationAttempted.current) return;

    // If container doesn't exist, don't proceed
    if (!containerRef.current) return;

    initializationAttempted.current = true;

    const initializeDaily = async () => {
      try {
        // Clear any children from the container
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }

        // Ensure any existing frame is destroyed first
        if (callFrameRef.current) {
          try {
            await callFrameRef.current.destroy();
          } catch (e) {
            console.error("Error destroying previous call frame:", e);
          }
          callFrameRef.current = null;
        }

        // Create new Daily iframe
        const callFrame = DailyIframe.createFrame(containerRef.current, {
          iframeStyle: {
            position: "relative",
            width: "100%",
            height: "500px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          },
          showLeaveButton: true,
        });

        callFrameRef.current = callFrame;
        setIsInitialized(true);

        // Join the room
        await callFrame.join({ url: roomUrl });

        // Add event listeners
        callFrame.on("left-meeting", handleLeftMeeting);
        callFrame.on("error", handleError);
      } catch (error) {
        console.error("Error creating Daily iframe:", error);
        setError("Failed to initialize video chat. Please try again later.");
        setIsInitialized(false);
        initializationAttempted.current = false;
      }
    };

    const handleLeftMeeting = () => {
      cleanupCallFrame();
    };

    const handleError = (e) => {
      console.error("Daily call error:", e);
      setError("Video chat encountered an error. Please refresh the page.");
      cleanupCallFrame();
    };

    const cleanupCallFrame = async () => {
      if (callFrameRef.current) {
        try {
          callFrameRef.current.off("left-meeting", handleLeftMeeting);
          callFrameRef.current.off("error", handleError);
          await callFrameRef.current.destroy();
        } catch (e) {
          console.error("Error during cleanup:", e);
        } finally {
          callFrameRef.current = null;
          setIsInitialized(false);
          initializationAttempted.current = false;
        }
      }
    };

    initializeDaily();

    // Cleanup function
    return () => {
      cleanupCallFrame();
    };
  }, [roomUrl]);

  return (
    <div className="mt-4">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div ref={containerRef} className="daily-container" />
    </div>
  );
}
