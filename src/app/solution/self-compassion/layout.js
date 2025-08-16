// src/app/solution/self-compassion/layout.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Self compassion",
};

export default async function CompassionLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent("/solution/self-compassion")}`
    );
  }
  return (
    <div className="h-screen flex flex-col ">
      <Upperbar title="Self compassion" />
      <div>{children}</div>
      <Navbar />
    </div>
  );
}
