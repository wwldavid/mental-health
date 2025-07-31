// src/app/solution/gratitude/Layout.js
import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Gratitude Practice",
};

export default function GratitudeLayout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-[url('/grati_bg.png')] bg-cover bg-center">
      <Upperbar title="Gratitude" />
      <div className="mt-16 flex-grow overflow-auto">{children}</div>
      <Navbar />
    </div>
  );
}
