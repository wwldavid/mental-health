import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { peerId } = await req.json();
  const me = Number(session.user.id);
  const you = Number(peerId);

  if (!you || you === me) {
    return NextResponse.json({ error: "Invalid peerId" }, { status: 400 });
  }

  let chat = await prisma.chat.findFirst({
    where: {
      AND: [
        { users: { some: { userId: me } } },
        { users: { some: { userId: you } } },
      ],
    },
    select: { id: true },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        users: {
          create: [{ userId: me }, { userId: you }],
        },
      },
      select: { id: true },
    });
  }

  return NextResponse.json({ chatId: chat.id }, { status: 200 });
}
