// src/app/api/providers/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const providers = await prisma.provider.findMany({
      include: {
        // 同时把关联的 User 信息也拉出来
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json(providers);
  } catch (error) {
    console.error("GET /api/providers error", error);
    return NextResponse.json(
      { error: "Failed to load providers" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { userId, bio, specialties, rateInfo, languages, availability, image } =
    await req.json();
  const provider = await prisma.provider.create({
    data: {
      userId,
      bio,
      specialties,
      rateInfo,
      languages,
      availability,
      image,
    },
    include: { user: true },
  });
  return NextResponse.json(provider, { status: 201 });
}
