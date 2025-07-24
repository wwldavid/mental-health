// src>lib>prisma.js

import { PrismaClient } from "@prisma/client";

// 使用 globalThis 代替 global 以获得更好的跨环境兼容性
const globalForPrisma = globalThis;

// 检查是否已有实例，避免重复创建
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// 在开发环境下将实例挂载到全局，避免热重载时重复创建
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// 可选：添加连接测试
prisma
  .$connect()
  .then(() => console.log("✅ Prisma connected successfully"))
  .catch((err) => console.error("❌ Prisma connection error:", err));

export default prisma;
