// src/app/api/goals/stats/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stats = await prisma.goal.groupBy({
    by: ["status"],
    _count: { _all: true },
    where: { userId: session.user.id },
  });

  return NextResponse.json(stats);
}
