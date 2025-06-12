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
      setShowMain(true); // 说明已经完成 onboarding
    } else {
      router.replace("/welcome"); // 还没完成，引导去 onboarding 流程
    }
  }, [router]);

  if (!showMain) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#E9E9E9]">
      <OpenaiSuggest />
    </div>
  );
}
