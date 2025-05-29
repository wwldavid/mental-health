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

  const prompt = `The user said: "${feeling}"

1. First, respond with **3 short, empathetic sentences** to acknowledge how the user might be feeling.
2. Then, give a **short paragraph** of encouragement or general mental wellness advice.
3. Finally, suggest **up to 4 items** ONLY from the list below that may help. Return only the titles of these suggestions.

Suggestion list:
- ${titlesList}

Return your full response in the following JSON format:
{
  "acknowledgement": ["...", "...", "..."],
  "advice": "...",
  "suggestions": ["...", "...", "...", "..."]
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  let acknowledgement = [];
  let advice = "";
  let returnedTitles = [];

  try {
    const content = completion.choices[0].message.content || "";
    const parsed = JSON.parse(content);
    acknowledgement = parsed.acknowledgement;
    advice = parsed.advice;
    returnedTitles = parsed.suggestions;
  } catch (e) {
    console.error("Failed to parse OpenAI response:", e);
  }

  const filteredSuggestions = suggestions
    .filter((s) => returnedTitles.includes(s.title))
    .slice(0, 4);

  return NextResponse.json({
    acknowledgement,
    advice,
    suggestions: filteredSuggestions,
  });
}
