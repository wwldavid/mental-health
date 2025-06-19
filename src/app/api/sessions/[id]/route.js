// src/app/api/sessions/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(req, { params }) {
  const { id } = params;
  console.log(
    `🗑️ Request to delete TherapySession id="${id}" (type: ${typeof id})`
  );

  // Validate and parse id
  const sessionId = Number(id);
  if (isNaN(sessionId)) {
    console.error(`Invalid session id provided: "${id}"`);
    return NextResponse.json(
      { error: `Invalid session id: ${id}` },
      { status: 400 }
    );
  }

  try {
    // Delete the therapy session record
    const deleted = await prisma.therapySession.delete({
      where: { id: sessionId },
    });
    console.log("✅ TherapySession deleted successfully:", deleted);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting TherapySession:", error);
    // If record not found, treat as success (idempotent)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.warn(`⚠️ TherapySession id=${sessionId} does not exist`);
      return NextResponse.json({ success: true });
    }
    // Other errors
    return NextResponse.json(
      { error: "取消预约失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
