// src/app/solution/self-compassion/page.js
import SelfCompassionList from "@/components/SelfCompassionList";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function SelfCompassionPage() {
  // 1. 确保已登录
  const session = await getServerSession(authOptions);
  if (!session) return null;

  // 2. 拉取当前用户的所有 CompassionEntry
  const entries = await prisma.compassionEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  // 3. 按类别分组
  const byCategory = {
    COMMON_HUMANITY: [],
    MINDFULNESS: [],
    KINDNESS: [],
  };
  entries.forEach((e) => byCategory[e.category].push(e));

  // 4. 渲染 Client Component
  return <SelfCompassionList entriesByCategory={byCategory} />;
}
