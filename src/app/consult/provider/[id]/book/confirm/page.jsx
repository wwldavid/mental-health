// src/app/consult/provider/[id]/book/confirm/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export default function BookingConfirmedPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const datetime = searchParams.get("datetime"); // e.g. 'August 12, 2025 2:00pm'
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    fetch(`/api/providers/${id}`)
      .then((res) => res.json())
      .then((data) => setProvider(data))
      .catch((err) => {
        console.error("Failed to load provider:", err);
      });
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/consult");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[url('/provider_bg4.png')] bg-cover bg-center">
      <Upperbar title="Session" />
      <div className="flex-1 mt-28 mb-6 flex flex-col items-center justify-start gap-4 px-8">
        <h2 className="text-xl font-semibold mb-2">Session Confirmed</h2>
        <p className="mb-2 text-lg ">
          {provider
            ? `You are all set for your session with ${provider.user.name}`
            : "Loading..."}{" "}
          on
        </p>
        {datetime && <p className="mb-2 text-lg text-[#4782A9]">{datetime}</p>}
        <p className="mb-4 text-lg">
          We are looking forward to talking with you.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting back to sessions list...
        </p>
      </div>
      <Navbar />
    </div>
  );
}
