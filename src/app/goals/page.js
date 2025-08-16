// src/app/goals/page.js
export const dynamic = "force-dynamic";
import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function GoalsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  // 拿 stats
  const stats = await prisma.goal.groupBy({
    by: ["status"],
    _count: { _all: true },
    where: { userId: session.user.id },
  });
  const counts = Object.fromEntries(
    stats.map((s) => [s.status, s._count._all])
  );

  const items = [
    {
      status: "NOT_STARTED",
      bg: "/images/goal_new.webp",
      count: counts.NOT_STARTED || 0,
    },
    {
      status: "IN_PROGRESS",
      bg: "/images/goal_pro.webp",
      count: counts.IN_PROGRESS || 0,
    },
    {
      status: "ACHIEVED",
      bg: "/images/goal_com.webp",
      count: counts.ACHIEVED || 0,
    },
  ];

  return (
    <div className="mt-16 flex flex-col gap-3 p-4 mb-32">
      {items.map(({ status, bg, count }) => (
        <Link
          key={status}
          prefetch={false}
          href={`/goals/list?status=${status}`}
          className="relative w-full h-44 border-2 rounded-2xl shadow-lg flex items-center justify-center bg-center bg-cover"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <span className="absolute bottom-2 right-2 text-gray-800 px-2 py-1 rounded-full">
            {count}
          </span>
        </Link>
      ))}
    </div>
  );
}
