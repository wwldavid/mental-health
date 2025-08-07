// src/app/api/solution/self-compassion/entries/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entries = await prisma.compassionEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(entries);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  /**
   * body: { entries: [ { content, category }, ... ] }
   */
  const { entries } = await req.json();
  const created = await Promise.all(
    entries.map((e) =>
      prisma.compassionEntry.create({
        data: {
          content: e.content,
          category: e.category,
          user: { connect: { id: session.user.id } },
        },
      })
    )
  );
  return NextResponse.json(created, { status: 201 });
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  const { content, category } = await req.json();
  const updated = await prisma.compassionEntry.update({
    where: { id },
    data: { content, category },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  await prisma.compassionEntry.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
