// src/app/consult/provider/[id]/book/confirm/page.jsx
"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export default function BookingConfirmedPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const datetime = searchParams.get("datetime"); // e.g. 'August 12, 2025 2:00pm'

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[#E9E9E9]">
      <Upperbar title="Session" />
      <h2 className="mt-28 mb-4 text-xl font-semibold">Session Confirmed</h2>
      <p>You are all set for your session with Provider #{id}.</p>
      {datetime && <p>{datetime}</p>}
      <p>We are looking forward to talking with you.</p>
      <Navbar />
    </div>
  );
}
