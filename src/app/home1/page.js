"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [feeling, setFeeling] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ feeling }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setSuggestions(data.suggestions);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-100 to-white">
      <motion.h1
        className="text-3xl sm:text-4xl font-serif text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        How are you feeling today?
      </motion.h1>

      <Textarea
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="e.g. I feel a bit anxious..."
        className="max-w-xl w-full mb-4"
        rows={3}
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Get Suggestions"}
      </Button>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
        <AnimatePresence>
          {suggestions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                onClick={() => router.push(`/solution/${s.slug}`)}
                className="hover:shadow-xl transition cursor-pointer"
              >
                <CardContent className="p-4 text-center font-medium text-lg">
                  {s.title}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </main>
  );
}
