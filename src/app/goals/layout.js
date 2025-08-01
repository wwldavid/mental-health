import Upperbar from "@/components/Upperbar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Goals",
};

export default function GoalsLayout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-[url('/grati_bg.png')] bg-cover bg-center">
      <Upperbar title="Goals" />
      <div className="mt-16 flex-grow overflow-auto">{children}</div>
      <Navbar />
    </div>
  );
}
