"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function OpenaiSuggest() {
  const [feeling, setFeeling] = useState("");
  const [acknowledgement, setAcknowledgement] = useState([]);
  const [advice, setAdvice] = useState("");

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
    setAcknowledgement(data.acknowledgement);
    setAdvice(data.advice);
    setSuggestions(data.suggestions);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center p-6 mb-10">
      <motion.h2
        className="text-3xl sm:text-4xl font-serif text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hi,welcome to our app!
        <br />
        How are you feeling today?
      </motion.h2>

      <Textarea
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="e.g. I feel a bit anxious..."
        className="max-w-xl w-full mb-4"
        rows={3}
      />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#00a3af] hover:opacity-90 text-white"
      >
        {loading ? "Analyzing..." : "Get Suggestions"}
      </Button>

      <div className="mt-8 max-w-2xl w-full">
        {acknowledgement.length > 0 && (
          <div className="mb-4 space-y-2">
            {acknowledgement.map((line, idx) => (
              <p key={idx} className="text-gray-700 italic">
                {line}
              </p>
            ))}
          </div>
        )}

        {advice && (
          <div className="mb-6">
            <p className="text-base text-gray-800 font-medium">{advice}</p>
          </div>
        )}
      </div>

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
                <CardContent className="p-4 flex items-center justify-center gap-2 text-lg font-medium text-[#00a3af]">
                  <span>🌼</span>
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
