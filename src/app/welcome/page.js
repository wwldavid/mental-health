"use client";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();

  const buttonStyle =
    "w-full max-w-xs bg-[#3a5b52] text-white py-2 px-4 rounded mb-4 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200";

  return (
    <div className="min-h-screen flex flex-col items-center justify-around bg-white px-6">
      <h1 className="text-4xl font-bold mb-8">SEREIN</h1>

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
