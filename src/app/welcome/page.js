"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Ellipse from "@/icons/ellipse.png";

export default function Welcome() {
  const router = useRouter();

  const buttonStyle =
    "w-[361px] h-[46px] mx-auto block bg-[#000] text-white py-2 mb-6 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200";

  return (
    <div className="min-h-screen flex flex-col items-center justify-around bg-white">
      <div className="flex flex-col items-center">
        <h1 className="text-[60px] font-bold mb-6">SEREIN</h1>
        <Image
          src={Ellipse}
          alt="Ellipse"
          width={187}
          height={187}
          className="w-[187px] h-[187px]"
        />
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
