"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const { data: session, status } = useSession();
  // 还在加载 或 未登录，就不渲染
  if (status !== "authenticated") return null;

  return (
    <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
      登出
    </Button>
  );
}
