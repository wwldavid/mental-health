// src/app/api/solution/self-compassion/questions/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET() {
  // Prompt：生成 6 个问题、分别归属于 3 个 category
  const prompt = `
Generate 6 reflective questions for self-compassion, 2 for each category:
- COMMON_HUMANITY
- MINDFULNESS
- KINDNESS

Return a JSON array. Each item should include two keys:
- "question": the question text
- "category": one of the three categories above
`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  let list = [];
  try {
    list = JSON.parse(completion.choices[0].message.content);
  } catch {
    console.error("解析 OpenAI 返回失败");
  }
  return NextResponse.json(list);
}
