// src/app/solution/self-compassion/reflect/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";

export default function ReflectPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch("/api/solution/self-compassion/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const handleChange = (idx, val) => {
    setAnswers({ ...answers, [idx]: val });
  };

  const handleSubmit = async () => {
    const payload = questions
      .map((q, i) => ({
        content: answers[i],
        category: q.category,
      }))
      .filter((e) => e.content?.trim());

    if (!payload.length) return;

    await fetch("/api/solution/self-compassion/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries: payload }),
    });
    router.push("/solution/self-compassion");
    router.refresh();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold ">Self Compassion</h2>

      <div className="mt-4 p-1 space-y-4 h-[570px] overflow-y-auto">
        {questions.map((q, i) => (
          <div
            key={i}
            className=" mx-auto p-4 bg-white/60 rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.50)]"
          >
            <p className="text-neutral-700 text-lg font-bold leading-7">
              {q.question}
            </p>
            <div className="relative mt-2">
              <textarea
                placeholder="Write your answer here"
                className="w-full h-32 mt-2 p-2"
                value={answers[i] || ""}
                onChange={(e) => handleChange(i, e.target.value)}
              />
              <button
                onClick={() => {
                  /* TODO: 语音输入 */
                }}
                className="absolute bottom-2 right-2 w-6 h-6 bg-[#4782A9] rounded flex items-center justify-center"
              >
                <Mic className="text-white" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-20 left-0 w-full p-4">
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
        >
          Reflect
        </button>
      </div>
    </div>
  );
}
