// src/app/solution/gratitude/page.js

import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Gratitude() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const entries = await prisma.gratitudeEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mt-10 px-4 text-neutral-700">
      <h2 className="text-xl font-semibold ">Gratitude Practice</h2>

      <div className="mt-4 space-y-8">
        {entries.map((e) => (
          <Link key={e.id} href={`/solution/gratitude/${e.id}`}>
            <div className="cursor-pointer mt-2 border-b-2">
              <div className="text-lg font-bold">
                {new Date(e.createdAt).toISOString().split("T")[0]}
              </div>

              <div
                className="mt-1 font-normal overflow-hidden leading-7"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {e.content}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 w-full p-4">
        <Link href="/solution/gratitude/new">
          <button className="flex items-center justify-center w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]">
            New Entry
          </button>
        </Link>
      </div>
    </div>
  );
}
