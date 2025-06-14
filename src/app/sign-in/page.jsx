// app/sign-in/page.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
      router.push(res.url || callbackUrl);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

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

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Log In
        </button>

        {/* 可选：第三方登录按钮 */}
        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("discord", { callbackUrl })}
            className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
          >
            Continue with Discord
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Without an account ？{" "}
          <a
            href="/onboarding/step1"
            className="text-[#7ebeab] hover:underline"
          >
            Sign in now
          </a>
        </p>
      </form>
    </div>
  );
}
