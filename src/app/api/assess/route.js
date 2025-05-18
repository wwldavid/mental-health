import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { age, gender, sleepQuality, stressLevel, mood, concerns } =
      await request.json();

    const prompt = [
      "You are a professional mental health advisor. Please provide an assessment and suggestions based on the following user information:",
      "",
      `· Age: ${age}`,
      `· Gender: ${gender}`,
      `· Sleep Quality (1-10): ${sleepQuality}`,
      `· Stress Level (1-10): ${stressLevel}`,
      `· Recent Mood: ${mood}`,
      `· Main Concerns: ${concerns}`,
      "",
      "Please strictly follow the requirements below:",
      "1. Use a friendly and supportive tone (avoid medical jargon).",
      "2. Include the following three parts:",
      "   - Brief mental health assessment.",
      "   - 3-5 specific suggestions for improvement.",
      "   - If necessary, advise seeking professional help.",
      "3. Return in plain text format (no Markdown or bullet points).",
      "4. Separate each paragraph with a blank line.",
    ].join("\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a compassionate and knowledgeable mental health advisor.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assessment = completion.choices[0].message.content;

    return NextResponse.json({ assessment });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error generating assessment" },
      { status: 500 }
    );
  }
}
