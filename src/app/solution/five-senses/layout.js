// src/app/solution/gratitude/layout.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Five Senses",
};

export default async function GratitudeLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent("/solution/five-senses")}`
    );
  }
  return (
    <div className="h-screen flex flex-col bg-[url('/sense_bg.png')] bg-cover bg-center">
      <Upperbar title="Five Senses" />
      <div className="mt-16 flex-grow overflow-auto">{children}</div>
      <Navbar />
    </div>
  );
}
