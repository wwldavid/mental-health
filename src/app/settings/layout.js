// src/app/solution/settings/layout.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Settings",
};

export default async function SettingsLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent("/settings")}`);
  }
  return (
    <div className="h-screen flex flex-col bg-[url('/setting.png')] bg-cover bg-center">
      <Upperbar title="Settings" />
      <div className="mt-16 flex-grow overflow-auto">{children}</div>
      <Navbar />
    </div>
  );
}
