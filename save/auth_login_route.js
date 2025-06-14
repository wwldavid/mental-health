// src>app>api>auth>login>route.js

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 检查用户是否存在
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // ✅ 使用 bcrypt 校验密码
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // 返回用户信息（去掉密码字段）
    const { password: _, ...userWithoutPassword } = user;

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: userWithoutPassword,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
