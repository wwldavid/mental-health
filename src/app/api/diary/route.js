// src/app/api/diary/route.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// 获取当前用户的所有日记（按创建时间倒序）
export async function GET(req) {
  const session = await getServerSession(authOptions);
  // 未登录时只返回公开条目，登录后返回自己的全部条目
  const where = session
    ? { user: { email: session.user.email } }
    : { isPublic: true };

  const entries = await prisma.diaryEntry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      isPublic: true,
      color: true, // 新增：返回颜色字段
      createdAt: true,
    },
  });

  return Response.json(entries);
}

// 创建一条新的日记
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { content, isPublic, color } = await req.json();

  const newEntry = await prisma.diaryEntry.create({
    data: {
      content,
      isPublic,
      color, // 新增：存颜色
      user: { connect: { email: session.user.email } },
    },
  });

  return Response.json(newEntry);
}
