// app/api/auth/signup/route.js
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // 1. 检查邮箱是否已被使用
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(
        JSON.stringify({ error: "This email has been used" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. 加密密码并创建新用户
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    // 3. 根据专家邮箱列表查出真正存在的专家账号
    const expertEmails = [
      "alice@therapy.com",
      "bob@therapy.com",
      "carol@therapy.com",
    ];
    const experts = await prisma.user.findMany({
      where: { email: { in: expertEmails } },
      select: { id: true },
    });

    // 4. 为每位专家与新用户创建一条 Chat
    await Promise.all(
      experts.map((e) =>
        prisma.chat.create({
          data: {
            users: {
              create: [{ userId: user.id }, { userId: e.id }],
            },
          },
        })
      )
    );

    // 5. 返回新用户信息
    return new Response(JSON.stringify({ user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({ error: "register failed, please try again later" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
