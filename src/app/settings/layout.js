// src/app/solution/settings/layout.js

import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Settings",
};

export default async function SettingsLayout({ children }) {
  return (
    <div className="min-h-svh flex flex-col bg-[url('/setting.png')] bg-cover bg-center">
      <Upperbar title="Settings" />
      <div className="mt-16 flex-grow overflow-auto">{children}</div>
      <Navbar />
    </div>
  );
}
