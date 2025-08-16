// src>app>home>page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OpenaiSuggest from "@/components/OpenaiSuggest";

export default function Home() {
  const router = useRouter();
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem("onboardingComplete");
    if (completed === "true") {
      setShowMain(true);
    } else {
      router.replace("/welcome");
    }
  }, [router]);

  if (!showMain) return null;

  return (
    <div className="flex flex-col items-center justify-center py-6 bg-[url('/mycenter_bg.webp')] bg-cover bg-center">
      <OpenaiSuggest />
    </div>
  );
}
