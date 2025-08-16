import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
import GoalsShell from "./GoalsShell";

export const metadata = {
  title: "Goals",
};

export const dynamic = "force-dynamic";

export default async function GoalsLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent("/goals")}`);
  }
  return (
    <GoalsShell>
      <Upperbar title="Goals" />
      <div className="mt-16 flex-grow overflow-auto">{children}</div>
      <Navbar />
    </GoalsShell>
  );
}
