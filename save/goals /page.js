// src>app>goals>page.js
"use client";
import { useRouter } from "next/navigation";
import { PlusCircle, PlayCircle, CheckCircle } from "lucide-react";
import Upperbar from "@/components/Upperbar";

export default function Goals() {
  const router = useRouter();
  const items = [
    { label: "New Goals", icon: <PlusCircle />, status: "not_start" },
    { label: "Goals in Progress", icon: <PlayCircle />, status: "in_progress" },
    { label: "Achieved Goals", icon: <CheckCircle />, status: "achieved" },
  ];
  return (
    <div className="min-h-screen flex flex-col p-4 bg-[url('/journal_bg3.png')] bg-cover bg-center">
      <Upperbar title="Goals" />
      <div className="mt-32 flex flex-col gap-5">
        {items.map(({ label, icon, status }) => (
          <button
            key={status}
            className="flex items-center space-x-2 px-6 py-3 bg-sky-700 text-white rounded-lg shadow"
            onClick={() => router.push(`/goals/list?status=${status}`)}
          >
            {icon}
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
