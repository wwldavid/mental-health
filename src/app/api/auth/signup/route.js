// app/api/auth/signup/route.js
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { name, email, password } = await req.json();

  // 检查邮箱唯一
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return new Response(JSON.stringify({ error: "该邮箱已被使用" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 加密并创建
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return new Response(JSON.stringify({ user }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
