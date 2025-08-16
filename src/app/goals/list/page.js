export const dynamic = "force-dynamic";
import GoalList from "@/components/GoalList";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function GoalsList({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const where = { userId: session.user.id };
  if (searchParams.status) where.status = searchParams.status;

  const initialGoals = await prisma.goal.findMany({
    where,
    include: { steps: true },
    orderBy: { createdAt: "desc" },
  });

  // 动态标题
  const title =
    searchParams.status === "NOT_STARTED"
      ? "New Goals"
      : searchParams.status === "IN_PROGRESS"
      ? "Goals In Progress"
      : "Completed Goals";

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <GoalList initialGoals={initialGoals} status={searchParams.status} />
    </div>
  );
}
