"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step5() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[url('/step_bg5.png')] bg-cover bg-center">
      <div className=" px-4 pt-9 mt-16 rounded-b-xl flex justify-between items-center ">
        <button onClick={() => router.push("/welcome")} className=" text-xl">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 p-7 flex flex-col mt-40 items-center mx-auto  w-72 text-neutral-700 text-2xl font-extrabold ">
        <p className="indent-6 text-lg text-gray-800 font-medium">
          You have taken a meaningful step, and your presence here is a sign of
          strength. <br />
          <span className="block indent-6">
            Remember: it is always okay to reach out.
          </span>
        </p>
      </div>
      <div className="fixed bottom-5 left-0 w-full  p-4 ">
        <button
          onClick={() => {
            localStorage.setItem("onboardingComplete", "true");
            router.push("/home");
          }}
          className="w-full h-11 bg-gradient-to-r from-[#2c3e50]/90 to-[#2980b9]/80 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] inline-flex justify-center items-center overflow-hidden mb-6 text-center text-white text-xl font-semibold"
        >
          Begin
        </button>
      </div>
    </div>
  );
}
