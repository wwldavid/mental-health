// src/components/ConditionalNavbar.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar({ mobile = false }) {
  const path = usePathname();

  if (
    path.startsWith("/welcome") ||
    path.startsWith("/onboarding") ||
    path.startsWith("/sign-in")
  ) {
    return null;
  }

  return <Navbar mobile={mobile} />;
}
