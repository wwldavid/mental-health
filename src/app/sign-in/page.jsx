// app/sign-in/page.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ChevronLeft } from "lucide-react";

const buttonStyle =
  "w-full h-11 mx-auto block bg-[#325C77] rounded-2xl text-white py-2 mb-6 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200 ";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/chat";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 调用 NextAuth Credentials Provider
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!res) {
      setError("登录失败，请重试");
      return;
    }
    if (res.error) {
      setError(res.error);
    } else {
      // 登录成功，跳转到 callbackUrl
      localStorage.setItem("onboardingComplete", "true");
      router.push(res.url || callbackUrl);
    }
  };

  return (
    <div className=" min-h-screen p-4">
      <div className="w-full flex justify-between items-center mt-10 px-4 h-12 mb-6 bg-[#EAD098] rounded-bl-2xl rounded-br-2xl">
        <button
          onClick={() => router.push("/welcome")}
          className="text-gray-600 text-xl"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mt-32 mb-6">
          Log In
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#7ebeab]"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#7ebeab]"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className={buttonStyle}>
          Log In
        </button>

        {/* 可选：第三方登录按钮 */}
        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className={buttonStyle}
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("discord", { callbackUrl })}
            className={buttonStyle}
          >
            Continue with Discord
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Without an account ？{" "}
          <a
            href="/onboarding/step1"
            className="text-[#325C77] hover:underline"
          >
            Sign in now
          </a>
        </p>
      </form>
    </div>
  );
}
