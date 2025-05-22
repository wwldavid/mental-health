import { NextResponse } from "next/server";
import OpenAI from "openai";
import suggestions from "@/lib/suggestions"; // 你的完整建议列表

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const body = await req.json();
  const feeling = body.feeling;

  const titlesList = suggestions.map((s) => s.title).join("\n- ");

  const prompt = `The user said: "${feeling}". Suggest up to 4 helpful and empathetic activities they can try. Choose only from this list:\n\n- ${titlesList}\n\nReturn only a numbered list.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices[0].message.content || "";
  const returnedTitles = content
    .split("\n")
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

  // 从完整列表中筛选，返回完整信息，最多4条
  const filteredSuggestions = suggestions
    .filter((s) => returnedTitles.includes(s.title))
    .slice(0, 4);

  return NextResponse.json({ suggestions: filteredSuggestions });
}
