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
      label: "Content1",
      items: [
        { name: "Subitem 1", path: "/subitem1" },
        { name: "Subitem 2", path: "/subitem2" },
        { name: "Subitem 3", path: "/subitem3" },
      ],
    },
    {
      label: "Content2",
      items: [
        { name: "Subitem 4", path: "/subitem4" },
        { name: "Subitem 5", path: "/subitem5" },
        { name: "Subitem 6", path: "/subitem6" },
      ],
    },
    {
      label: "Content3",
      items: [
        { name: "Subitem 7", path: "/subitem7" },
        { name: "Subitem 8", path: "/subitem8" },
        { name: "Subitem 9", path: "/subitem9" },
      ],
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
