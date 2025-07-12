// app/solution/do-breathing-exercise/layout.js
"use client";

import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";
export default function breatheLayout({ children }) {
  return (
    <div className=" min-h-screen flex flex-col bg-[url('/breath_bg.png')] bg-cover bg-center">
      <Upperbar title="Breathe" />
      <div>{children}</div>
      <Navbar />
    </div>
  );
}
