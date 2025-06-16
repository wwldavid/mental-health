// src/app/api/diary/[id]/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// 获取单条日记详情
export async function GET(req, { params }) {
  const id = parseInt(params.id, 10);
  const entry = await prisma.diaryEntry.findUnique({
    where: { id },
    select: {
      id: true,
      content: true,
      color: true,
      createdAt: true,
    },
  });
  if (!entry) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(entry);
}

// 更新单条日记（内容 & 颜色）
export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const id = parseInt(params.id, 10);
  const { content, color } = await req.json();

  const updated = await prisma.diaryEntry.update({
    where: { id },
    data: {
      content,
      color,
    },
  });

  return Response.json(updated);
}
