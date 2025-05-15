"use client";
import { useSearchParams } from "next/navigation";
import DoctorVideoChat from "@/components/DoctorVideoChat";

export default function DoctorRoom() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const roomUrl = roomId ? `https://myhealthroom.daily.co/${roomId}` : null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Doctor-side video call</h2>
      {roomUrl ? (
        <DoctorVideoChat roomUrl={roomUrl} />
      ) : (
        <p className="text-red-600">
          ❌ Room ID not provided. Please enter correctly through the user side.
        </p>
      )}
    </div>
  );
}
