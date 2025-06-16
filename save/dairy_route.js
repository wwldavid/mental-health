// src>app>api>diary>route.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// 获取当前用户的所有日记（按创建时间倒序）
export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (session) {
    // 登录用户：获取自己的全部日记
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) return new Response("User not found", { status: 404 });

    const entries = await prisma.diaryEntry.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(entries);
  } else {
    // 未登录用户：只显示公开的日记
    const publicEntries = await prisma.diaryEntry.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(publicEntries);
  }
}

// 创建一条新的日记
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!dbUser) return new Response("User not found", { status: 404 });

  const { content, isPublic } = await req.json();

  const newEntry = await prisma.diaryEntry.create({
    data: {
      content,
      isPublic,
      userId: dbUser.id,
    },
  });

  return Response.json(newEntry);
}
