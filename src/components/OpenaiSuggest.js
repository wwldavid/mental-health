"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

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
    <main className="h-screen ">
      <div className="fixed top-14 h-[59px] left-0 w-full bg-white shadow-sm px-4 py-2 mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-xl text-gray-600 hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-lg font-semibold text-gray-800">My Center</div>
        <div className="flex gap-2 p-2">
          <div className="w-[43px] h-[43px] rounded-full">
            <Image
              src="/images/wellness.png"
              width={10}
              height={10}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[43px] h-[43px] rounded-full">
            <Image
              src="/images/avatar.png"
              width={10}
              height={10}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-6 mt-28">
        <motion.h3
          className="text-2xl sm:text-4xl font-serif text-center mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello [User], how are you feeling today?
        </motion.h3>

        <Textarea
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          placeholder="I am feeling stressed because of work. My boss is very difficult and I am burned out."
          className="w-[361px] h-[233px] shrink-0 rounded-[15px] mt-4 mb-4 bg-[#D9D9D9]"
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
      </div>
    </main>
  );
}
