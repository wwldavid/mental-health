"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orientation, setOrientation] = useState("");
  const [error, setError] = useState("");

  const options = [
    "Profile",
    "Personalization",
    "Notifications",
    "Theme and Display",
    "Privacy and Security",
    "Language and Tone Preferences",
    "Accessibility",
    "Sound and Audio",
    "Sign In / Sign Out",
  ];

  const isAuthed = status === "authenticated";
  const authLabel = isAuthed ? "Sign Out" : "Sign In";

  const handleClick = async (option) => {
    setError("");

    if (option === "Sign In / Sign Out") {
      if (isAuthed) {
        // 登出后回到首页（你也可以换成想要的地址）
        await signOut({ callbackUrl: "/" });
      } else {
        // 走你的自定义登录页；带上回跳地址（当前路径）
        const target =
          typeof window !== "undefined"
            ? `/sign-in?callbackUrl=${encodeURIComponent(
                window.location.pathname +
                  window.location.search +
                  window.location.hash
              )}`
            : "/sign-in";
        router.push(target);

        // 如果你更想用 NextAuth 自带弹出/重定向，也可以用：
        // await signIn(undefined, { callbackUrl: "/" });
      }
      return; // 不走下面的选中逻辑
    }

    // 其他普通选项：保持你的选中高亮逻辑
    setOrientation(option);
  };

  return (
    <div className="p-5 flex-1 overflow-y-auto pb-28">
      <h2 className="text-xl font-semibold">Profile and Settings</h2>
      <div className="flex-1 mt-5 max-w-md w-full mx-auto space-y-5">
        <div className="space-y-4">
          {options.map((option) => {
            const isSelected = orientation === option;
            const label = option === "Sign In / Sign Out" ? authLabel : option;
            return (
              <div key={option} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    handleClick(option);
                    setError("");
                  }}
                  className={`w-full h-11  py-2.5  rounded-3xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.30)] flex justify-center items-center overflow-hidden text-lg font-semibold border-2 text-[#325C77] ${
                    isSelected ? "bg-[#cee4ae]" : ""
                  }`}
                  disabled={status === "loading"}
                >
                  {label}
                </button>
              </div>
            );
          })}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
