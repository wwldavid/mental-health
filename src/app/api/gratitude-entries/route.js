// src/app/api/gratitude-entries/route.js;

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse({ error: "Unauthorized" }, { status: 401 });

  const entries = await prisma.gratitudeEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(entries);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();
  const newEntry = await prisma.gratitudeEntry.create({
    data: { content, userId: session.user.id },
  });

  return NextResponse.json(newEntry, { status: 201 });
}
