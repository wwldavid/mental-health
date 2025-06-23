"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const buttonStyle =
  "w-96 h-11 mx-auto block bg-[#325C77] rounded-2xl text-white py-2 mb-6 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200 ";

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center gap-64 bg-white">
      <div className="flex flex-col items-center mt-52">
        <Image src="/logo.png" alt="logo" width={263} height={85} priority />
      </div>

      <div>
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
            router.push("/");
          }}
          className={buttonStyle}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
