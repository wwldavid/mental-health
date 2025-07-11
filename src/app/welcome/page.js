// src>app>welcome>page.js
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const buttonStyle =
  "w-full h-11 bg-gradient-to-r from-[#2c3e50]/90 to-[#2980b9]/80 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] inline-flex justify-center items-center overflow-hidden mb-6 text-center text-white text-xl font-semibold";

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center gap-64 bg-[url('/welcome_bg.png')] bg-cover bg-center">
      <div className="flex flex-col items-center mt-52 ">
        <Image src="/logo.png" alt="logo" width={263} height={85} priority />
      </div>

      <div className="fixed inset-x-0 bottom-8 flex flex-col items-center px-6">
        <button
          onClick={() => router.push("/onboarding/step1")}
          className={buttonStyle}
        >
          Sign Up
        </button>
        <button onClick={() => router.push("/sign-in")} className={buttonStyle}>
          Log In
        </button>
        <button
          onClick={() => {
            localStorage.setItem("onboardingComplete", "true");
            router.push("/home");
          }}
          className={buttonStyle}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
