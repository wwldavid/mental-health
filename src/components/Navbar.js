// src>components>Navbar.js
"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import { Menu, X } from "lucide-react";
import HomeIcon from "@/icons/home.svg";
import HomeIconActive from "@/icons/home_active.svg";
import JournalIcon from "@/icons/auto_stories.svg";
import JournalIconActive from "@/icons/auto_stories_active.svg";
import SessionsIcon from "@/icons/calendar_month.svg";
import SessionsIconActive from "@/icons/calendar_month_active.svg";
import GoalsIcon from "@/icons/flag.svg";
import GoalsIconActive from "@/icons/flag_active.svg";
import ChatIcon from "@/icons/mode_comment.svg";
import ChatIconActive from "@/icons/mode_comment_active.svg";

const Navbar = ({ mobile = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Home",
      items: [
        { name: "Mental Health Assessment", path: "/assessment" },
        { name: "Try meditation", path: "/meditation" },
        { name: "Take a walk", path: "/walk" },
        { name: "Listen to music", path: "/music" },
        { name: "Watch something funny", path: "/watch-something-funny" },
        { name: "Breathing exercise", path: "do-breathing-exercise" },
        { name: "Read a book", path: "read-a-book" },
        { name: "Take a short nap", path: "take-a-nap" },
        { name: "Write a gratitude list", path: "gratitude-list" },
        { name: "Drink a glass of water", path: "drink-water" },
        { name: "Call a friend", path: "call-friend" },
      ],
    },
    {
      label: "Journal",
      items: [
        { name: "Write in a journal", path: "/journal" },
        { name: "Talk to a therapist", path: "/consult" },
        { name: "Subitem 6", path: "/subitem6" },
      ],
    },
    {
      label: "Sessions",
      items: [
        { name: "doctor-room", path: "/doctor-room" },
        { name: "Subitem 8", path: "/subitem8" },
        { name: "Subitem 9", path: "/subitem9" },
      ],
    },
    {
      label: "Goals",
      items: [{ name: "Subitem 10", path: "/subitem10" }],
    },
    {
      label: "Chat",
      items: [{ name: "Chat", path: "/chat" }],
    },
  ];

  const handleSignIn = () => router.push("/sign-in");
  const handleSignUp = () => router.push("/sign-up");

  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 w-full h-20 pb-3 z-[100] border-t-2 border-[#325C77]/50 shadow-md flex justify-around items-center min-h-[64px] md:hidden">
        <button
          onClick={() => router.push("/journal")}
          className="flex flex-col items-center justify-center p-2"
        >
          {pathname === "/journal" ? (
            <JournalIconActive className="w-6 h-6 scale-125 text-white fill-current" />
          ) : (
            <JournalIcon className="w-6 h-6 scale-125 text-white fill-current" />
          )}
          <span className="mt-1 text-xs text-[#325C77]">Journal</span>
        </button>
        <button
          onClick={() => router.push("/consult")}
          className="flex flex-col items-center justify-center p-2"
        >
          {pathname === "/consult" ? (
            <SessionsIconActive className="w-6 h-6 scale-125 text-white fill-current" />
          ) : (
            <SessionsIcon className="w-6 h-6 scale-125 text-white fill-current" />
          )}
          <span className="mt-1 text-xs text-[#325C77]">Sessions</span>
        </button>
        <button
          onClick={() => router.push("/home")}
          className="flex flex-col items-center justify-center p-2"
        >
          {pathname === "/home" ? (
            <HomeIconActive className="w-6 h-6 scale-125 text-white fill-current" />
          ) : (
            <HomeIcon className="w-6 h-6 scale-125 text-white fill-current" />
          )}
          <span className="mt-1 text-xs text-[#325C77]">Home</span>
        </button>

        <button
          onClick={() => router.push("/chat")}
          className="flex flex-col items-center justify-center p-2"
        >
          {pathname === "/chat" ? (
            <ChatIconActive className="w-6 h-6 scale-125 text-white fill-current" />
          ) : (
            <ChatIcon className="w-6 h-6 scale-125 text-white fill-current" />
          )}
          <span className="mt-1 text-xs text-[#325C77]">Chats</span>
        </button>
        <button
          onClick={() => router.push("/subitem10")}
          className="flex flex-col items-center justify-center p-2"
        >
          {pathname === "/subitem10" ? (
            <GoalsIconActive className="w-6 h-6 scale-125 text-white fill-current" />
          ) : (
            <GoalsIcon className="w-6 h-6 scale-125 text-white fill-current" />
          )}
          <span className="mt-1 text-xs text-[#325C77]">Goals</span>
        </button>
      </div>
    );
  }

  // ✅ 桌面端顶部 navbar 样式
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md hidden md:block">
      <nav className="w-full bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Logo
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center gap-6">
            {menuItems.map((menu, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">{menu.label}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {menu.items.map((item, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      onClick={() => router.push(item.path)}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
