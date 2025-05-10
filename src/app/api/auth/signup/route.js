import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // ⚠️ 检查是否已有用户使用该邮箱
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 409, // Conflict 状态码
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // ✅ 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🎯 创建用户并存储加密后的密码
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully", user: newUser }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
