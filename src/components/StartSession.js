"use client";

import { useState } from "react";
import VideoChat from "./VideoChat";

export default function StartSession() {
  const [roomUrl, setRoomUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const startCall = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // 1. Create room first
      const res = await fetch("/api/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to create room: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Created room URL:", data.url);

      if (!data.url) {
        throw new Error("No room URL returned from API");
      }

      // Store the room URL
      setRoomUrl(data.url);

      // 2. Send SMS to doctor
      try {
        const smsRes = await fetch("/api/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: "+14038883609",
            message: `New consultation room link: ${data.url}`,
          }),
        });

        if (!smsRes.ok) {
          console.warn("Failed to send SMS, but continuing with video call");
          setSuccessMessage("Video room created. SMS delivery failed.");
        } else {
          setSuccessMessage("Video room created and SMS sent successfully.");
          console.log("SMS sent to doctor");
        }
      } catch (smsError) {
        console.warn("SMS error:", smsError);
        setSuccessMessage("Video room created. SMS delivery failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to create video consultation");
      setRoomUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const endSession = () => {
    // Reset room URL to null to unmount the VideoChat component
    setRoomUrl(null);

    // Clear any messages
    setSuccessMessage(null);
    setError(null);

    // Small delay to ensure cleanup
    setTimeout(() => {
      console.log("Session ended and room reset");
    }, 500);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-700 hover:text-red-900"
          >
            ✕
          </button>
        </div>
      )}

      {successMessage && !error && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-md">
          {successMessage}
          <button
            onClick={() => setSuccessMessage(null)}
            className="ml-2 text-green-700 hover:text-green-900"
          >
            ✕
          </button>
        </div>
      )}

      {!roomUrl ? (
        <button
          onClick={startCall}
          disabled={isLoading}
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Creating session..." : "Start Video Consultation"}
        </button>
      ) : (
        <div className="w-full max-w-2xl">
          <VideoChat roomUrl={roomUrl} />
          <div className="mt-4 flex justify-between">
            <button
              onClick={endSession}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
            >
              End Session
            </button>

            <button
              onClick={startCall}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Restart Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
