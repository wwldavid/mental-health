// src/app/solution/gratitude/layout.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Gratitude Practice",
};

export default async function GratitudeLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    // 带上 callbackUrl，登录后自动回到 /solution/gratitude
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent("/solution/gratitude")}`
    );
  }
  return (
    <div className="h-screen flex flex-col bg-[url('/grati_bg.webp')] bg-cover bg-center">
      <Upperbar title="Gratitude" />
      <div className="mt-16 flex-grow overflow-auto">{children}</div>
      <Navbar />
    </div>
  );
}
