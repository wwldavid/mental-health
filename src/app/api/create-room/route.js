// src/app/api/create-room/route.js
import { NextResponse } from "next/server";

const DAILY_BASE = "https://api.daily.co/v1";
const API_KEY = process.env.DAILY_API_KEY;

export async function POST(req) {
  try {
    // 1️⃣ 从请求体拿到 sessionId
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing sessionId in request body" },
        { status: 400 }
      );
    }

    const roomName = `session-${sessionId}`;
    const authHeader = { Authorization: `Bearer ${API_KEY}` };

    // 2️⃣ 先查房间是否存在
    const getRes = await fetch(`${DAILY_BASE}/rooms/${roomName}`, {
      headers: authHeader,
    });
    if (getRes.ok) {
      const existing = await getRes.json();
      return NextResponse.json({ url: existing.url });
    }

    // 3️⃣ 不存在就创建一个，注意要传 name 参数 :contentReference[oaicite:0]{index=0}
    const createRes = await fetch(`${DAILY_BASE}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify({
        name: roomName,
        properties: {
          exp: Math.floor(Date.now() / 1000) + 60 * 30,
          max_participants: 2,
          enable_chat: true,
        },
      }),
    });
    const data = await createRes.json();
    if (!data.url) {
      console.error("Daily create-room error data:", data);
      return NextResponse.json(
        { error: "Daily 房间创建失败", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (err) {
    console.error("create-room catch:", err);
    return NextResponse.json(
      { error: err.message || "未知错误" },
      { status: 500 }
    );
  }
}
