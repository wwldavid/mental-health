// src/app/api/goals/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  const goal = await prisma.goal.findUnique({
    where: { id },
    include: { steps: true },
  });
  if (!goal || goal.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(goal);
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  const { title, description, steps, status } = await req.json();

  // 构造 update data
  const data = {};
  if (typeof title === "string") data.title = title;
  if (typeof description === "string") data.description = description;
  if (status) {
    data.status = status;
    if (status === "ACHIEVED") data.completedAt = new Date();
  }

  // 用 deleteMany + create 简单替换 steps
  if (Array.isArray(steps)) {
    data.steps = {
      deleteMany: {},
      create: steps.map((text) => ({ title: text })),
    };
  }

  const updated = await prisma.goal.update({
    where: { id },
    data,
    include: { steps: true },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number(params.id);
  await prisma.goal.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
