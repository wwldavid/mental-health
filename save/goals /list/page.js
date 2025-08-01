import GoalList from "@/components/GoalList";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Upperbar from "@/components/Upperbar";

export default async function GoalsList({ searchParams }) {
  const session = await getServerSession(authOptions);
  const initialGoals = await prisma.goal.findMany({
    where: {
      userId: session.user.id,
      ...(searchParams.status && { status: searchParams.status }),
      ...(searchParams.search && {
        OR: [
          { title: { contains: searchParams.search, mode: "insensitive" } },
          { status: { contains: searchParams.search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="min-h-screen flex flex-col p-4 bg-[url('/journal_bg3.png')] bg-cover bg-center">
      <Upperbar title="Goals" />
      <GoalList initialGoals={initialGoals} />
    </div>
  );
}
