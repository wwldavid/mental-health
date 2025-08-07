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
    <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4 pb-2 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]">
      <div className=" h-[43px] grid grid-cols-[auto_1fr_auto] items-center rounded-b-2xl text-[#325C77]">
        <button
          onClick={() => router.back()}
          className="text-xl hover:text-black justify-self-start"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="pl-7 text-center text-lg font-semibold">{title}</div>
        <div className="relative flex gap-2  items-center justify-self-end">
          <div
            className="w-[43px] h-[43px]"
            onClick={() => router.push("/wellness")}
          >
            <Image
              src="/images/heart_plus.svg"
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
              src="/images/person.svg"
              width={43}
              height={43}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 下拉菜单 */}
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-32 text-[#325C77] border shadow-lg rounded"
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
    </div>
  );
}
