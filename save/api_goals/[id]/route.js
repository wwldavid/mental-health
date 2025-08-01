import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const id = parseInt(params.id, 10);
  const { status } = await req.json();

  const updated = await prisma.goal.update({
    where: { id },
    data: { status },
  });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const id = parseInt(params.id, 10);
  await prisma.goal.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
