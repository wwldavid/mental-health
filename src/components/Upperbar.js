// src>components>Upperbar.js
"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Upperbar({ title = "My Center" }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  // 点击别处时关闭菜单
  useEffect(() => {
    function onClickOutside(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div className="fixed top-3 h-[59px] left-0 w-full bg-white shadow-sm px-4 py-2 mb-6 flex items-center justify-between">
      <button
        onClick={() => router.back()}
        className="text-xl text-gray-600 hover:text-black"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="text-lg font-semibold text-gray-800">{title}</div>
      <div className="relative flex gap-2 p-2 items-center">
        <div
          className="w-[43px] h-[43px] rounded-full"
          onClick={() => router.push("/wellness")}
        >
          <Image
            src="/images/wellness.png"
            width={10}
            height={10}
            alt="wellness icon"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          ref={avatarRef}
          className={`w-[43px] h-[43px] rounded-full overflow-hidden cursor-pointer ${
            status === "authenticated" ? "" : "filter grayscale opacity-50"
          } `}
          onClick={() => {
            if (status === "authenticated") setMenuOpen((o) => !o);
          }}
        >
          <Image
            src="/images/avatar.png"
            width={10}
            height={10}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 下拉菜单 */}
        {menuOpen && status === "authenticated" && (
          <div
            className="absolute right-0 mt-2 w-32 bg-white border shadow-lg rounded"
            style={{ top: "60px" }}
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                // 先删掉你的 onboardingComplete flag
                localStorage.removeItem("onboardingComplete");
                // 再调用 NextAuth 的登出
                signOut({ callbackUrl: "/welcome" });
              }}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
