import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id, 10);

  const entry = await prisma.gratitudeEntry.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!entry) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(entry);
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  const { content } = await req.json();

  const result = await prisma.gratitudeEntry.updateMany({
    where: { id, userId: session.user.id },
    data: { content },
  });
  if (result.count === 0) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const updated = await prisma.gratitudeEntry.findUnique({
    where: { id },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = parseInt(params.id, 10);

  await prisma.gratitudeEntry.deleteMany({
    where: { id, userId: session.user.id },
  });
  return new NextResponse(null, { status: 204 });
}
