"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

import Upperbar from "./Upperbar";

export default function OpenaiSuggest() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "there";

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
    <main className="min-h-screen w-full ">
      <Upperbar title="My Center" />
      <div className="flex flex-col items-center justify-center py-6 px-3 mt-28 max-h-[72vh] overflow-y-auto overflow-x-hidden">
        <motion.h3
          className="text-2xl sm:text-4xl text-center mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello {userName}, how are you feeling today?
        </motion.h3>

        <Textarea
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          placeholder="I am feeling stressed because of work. My boss is very difficult and I am burned out."
          className="w-[340px] h-60 py-2 rounded-2xl border  border-zinc-600/50 bg-white"
          rows={6}
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full max-w-96 py-5 bg-[#4782A9] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]  text-center text-white text-xl font-semibold mt-5"
        >
          {loading ? "Analyzing..." : "Get Suggestions"}
        </Button>

        <div className="mt-28 max-w-2xl w-full">
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
        {/* 新增：当有 suggestions 时显示标题 */}
        {suggestions.length > 0 && (
          <h3 className="text-lg font-semibold text-[#69821b]">
            Suggested Activities
          </h3>
        )}

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full pb-40">
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
                  <CardContent className="p-2 flex items-center justify-center text-lg font-medium text-white bg-gradient-to-r from-slate-600 to-blue-400 rounded-xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]">
                    {s.title}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
