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
    <div className="fixed top-0 left-0 px-4 pt-10 pb-2 w-full bg-[#325C77] text-white shadow-sm mb-6 flex items-center justify-between rounded-b-2xl">
      <button
        onClick={() => router.back()}
        className="text-xl text-white hover:text-black"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="text-lg font-semibold text-white">{title}</div>
      <div className="relative flex gap-2 p-2 items-center">
        <div
          className="w-[43px] h-[43px]"
          onClick={() => router.push("/wellness")}
        >
          <Image
            src="/images/heart.svg"
            width={43}
            height={43}
            alt="wellness icon"
            className="w-full h-full  object-cover "
          />
        </div>
        <div
          ref={avatarRef}
          className={`w-[43px] h-[43px] rounded-full overflow-hidden cursor-pointer ${
            status === "authenticated" ? "" : "filter grayscale opacity-50"
          } `}
          onClick={() => {
            if (status === "authenticated") {
              // 切换下拉菜单
              setMenuOpen((o) => !o);
            } else {
              setMenuOpen(true);
            }
          }}
        >
          <Image
            src="/images/avatar.svg"
            width={43}
            height={43}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 下拉菜单 */}
        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-32 bg-[#325C77] border shadow-lg rounded"
            style={{ top: "60px" }}
          >
            {status === "authenticated" ? (
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  localStorage.removeItem("onboardingComplete");
                  signOut({ callbackUrl: "/welcome" });
                }}
              >
                Log out
              </button>
            ) : (
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => router.push("/sign-in")}
              >
                Sign in
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
