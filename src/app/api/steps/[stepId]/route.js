// src/app/api/steps/[stepId]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stepId = parseInt(params.stepId, 10);
  const { completed } = await req.json();

  const updated = await prisma.step.update({
    where: { id: stepId },
    data: { completed },
  });

  return NextResponse.json(updated);
}
