// app/api/messages/route.js
import prisma from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const chatId = Number(searchParams.get("chatId"));

  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
  });

  return new Response(JSON.stringify(messages), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const { chatId, senderId, content } = await request.json();

  const message = await prisma.message.create({
    data: {
      chatId: Number(chatId),
      senderId: Number(senderId),
      content,
    },
  });

  return new Response(JSON.stringify(message), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
