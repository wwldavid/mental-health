// src/app/consult/provider/[id]/book/confirm/page.jsx
"use client";
import React, { useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export default function BookingConfirmedPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const datetime = searchParams.get("datetime"); // e.g. 'August 12, 2025 2:00pm'

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/consult");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[url('/provider_bg4.png')] bg-cover bg-center">
      <Upperbar title="Session" />
      <div className="flex-1 mt-28 mb-4 flex flex-col items-center justify-start">
        <h2 className="text-xl font-semibold mb-2">Session Confirmed</h2>
        <p className="mb-2">
          You are all set for your session with Provider #{id}.
        </p>
        {datetime && <p className="mb-2">{datetime}</p>}
        <p className="mb-4">We are looking forward to talking with you.</p>
        <p className="text-sm text-gray-500">
          Redirecting back to sessions list...
        </p>
      </div>
      <Navbar />
    </div>
  );
}
