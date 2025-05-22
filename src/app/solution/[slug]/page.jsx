"use client";

import { useParams } from "next/navigation";
import suggestions from "@/lib/suggestions";

export default function SolutionPage() {
  const { slug } = useParams();
  const content = suggestions.find((s) => s.slug === slug);

  if (!content)
    return <div className="p-6 text-red-500">Solution not found.</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-semibold mb-4">{content.title}</h1>
        <p className="text-lg text-gray-700">{content.description}</p>
      </div>
    </main>
  );
}
