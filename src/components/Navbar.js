"use client";
import { useState } from "react";
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

  const menuItems = [
    {
      label: "Content1",
      items: ["Subitem 1", "Subitem 2", "Subitem 3"],
    },
    {
      label: "Content2",
      items: ["Subitem 4", "Subitem 5", "Subitem 6"],
    },
    {
      label: "Content3",
      items: ["Subitem 7", "Subitem 8", "Subitem 9"],
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <nav className="w-full bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold">Logo</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((menu, index) => (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">{menu.label}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {menu.items.map((item, idx) => (
                    <DropdownMenuItem key={idx}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Button variant="ghost">Sign In / Sign Up</Button>
          </div>
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
            {() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                    <DropdownMenuItem key={idx}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Button variant="ghost" className=" block w-full text-left">
              Sign In / Sign Up
            </Button>
            <Button variant="outline" className="text-left">
              Try for Free
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
