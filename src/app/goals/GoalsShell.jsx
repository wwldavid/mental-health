"use client";
import { usePathname } from "next/navigation";

export default function GoalsShell({ children }) {
  const pathname = usePathname();
  const isGoalsIndex = pathname === "/goals";

  const bg = isGoalsIndex
    ? ""
    : "bg-[url('/grati_bg.webp')] bg-cover bg-center";

  return <div className={`min-h-svh flex flex-col ${bg}`}>{children}</div>;
}
