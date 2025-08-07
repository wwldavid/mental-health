// src/app/api/solution/self-compassion/entries/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  const entry = await prisma.compassionEntry.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!entry) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(entry);
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  const { content } = await req.json();
  const updated = await prisma.compassionEntry.update({
    where: { id },
    data: { content },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  await prisma.compassionEntry.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
