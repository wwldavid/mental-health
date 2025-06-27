// app/solution/do-breathing-exercise/layout.js
"use client";

import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
export default function breatheLayout({ children }) {
  return (
    <div className=" min-h-screen flex flex-col">
      <Upperbar title="Breathe" />
      <div>{children}</div>
      <Navbar />
    </div>
  );
}
