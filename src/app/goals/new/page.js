"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Upperbar from "@/components/Upperbar";

export default function NewGoalPage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    router.push("/goals/list");
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-[url('/journal_bg3.png')] bg-cover bg-center">
      <Upperbar title="Goals" />
      <form
        onSubmit={handleSubmit}
        className="mt-28 max-w-md mx-auto p-4 space-y-4 "
      >
        <h2 className="text-xl font-semibold">Create New Goal</h2>
        <input
          type="text"
          required
          placeholder="Enter your goal"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-800 text-white rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
