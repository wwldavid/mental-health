export async function POST() {
  const apiKey = process.env.DAILY_API_KEY;

  const res = await fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      properties: {
        exp: Math.floor(Date.now() / 1000) + 60 * 30, // 有效30分钟
        max_participants: 2,
        enable_chat: true,
      },
    }),
  });

  const data = await res.json();
  console.log("🎯 修复后，Daily API 返回:", data);

  // ✅ 显式返回 JSON 内容
  if (!data.url) {
    return new Response(
      JSON.stringify({ error: "Missing room URL from Daily", data }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ url: data.url }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
