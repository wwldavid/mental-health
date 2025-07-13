// src/app/api/providers/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const provider = await prisma.provider.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
      },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "Provider not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(provider);
  } catch (error) {
    console.error(`GET /api/providers/${id} error`, error);
    return NextResponse.json(
      { error: "Failed to load provider" },
      { status: 500 }
    );
  }
}
