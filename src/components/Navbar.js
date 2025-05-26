"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

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
        { name: "Write in a journal", path: "/write-journal" },
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
  ];

  const handleSignIn = () => router.push("/sign-in");
  const handleSignUp = () => router.push("/sign-up");

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
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
          <div className="hidden md:flex items-center gap-6">
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
            <Button
              variant="ghost"
              className="block w-full text-left"
              onClick={() => router.push("/contact")}
            >
              Contact Us
            </Button>
            <Button variant="ghost" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button variant="ghost" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>

          {/* Try for Free 按钮 */}
          <div>
            <Button className="ml-4" variant="outline">
              Try for Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {isMobileMenuOpen ? (
              <X
                size={24}
                className="cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ) : (
              <Menu
                size={24}
                className="cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md border-t space-y-4">
            {menuItems.map((menu, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="block text-left">
                    {menu.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {menu.items.map((item, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      onClick={() => {
                        setIsMobileMenuOpen(false); // 关闭菜单
                        router.push(item.path); // 跳转
                      }}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Button
              variant="ghost"
              className="block w-full text-left"
              onClick={() => router.push("/contact")}
            >
              Contact Us
            </Button>
            <Button
              variant="ghost"
              className="block w-full text-left"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              className="block w-full text-left"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Button variant="outline" className="w-full text-left">
              Try for Free
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
