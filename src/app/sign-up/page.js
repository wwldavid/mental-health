"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // ✅ 注册成功后跳转登录页，保留 callbackUrl
        setTimeout(() => {
          router.push(
            `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`
          );
        }, 1000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-[490px] bg-white rounded-xl shadow-xl overflow-hidden mt-10">
        <div className="h-12 bg-[#a4e2c6] flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white opacity-60 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-white opacity-80 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-white mx-1"></div>
        </div>

        <div className="px-8 py-6">
          <h1 className="text-3xl font-light text-gray-800 mb-6 text-center">
            Create Account
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4e2c6] transition"
                placeholder="johndoe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4e2c6] transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4e2c6] transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a4e2c6] transition"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#a4e2c6] hover:bg-[#8ed4b5] text-white font-medium py-3 rounded-lg transition duration-300 shadow-md shadow-[#a4e2c6]/30"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <div className="h-px w-full bg-gray-200"></div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="text-[#66c29a] hover:underline font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
