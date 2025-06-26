"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ChevronLeft } from "lucide-react";

export default function Step1() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async () => {
    // —— 简单校验 ——
    if (!name || !email) return setError("Please enter your name and email.");
    if (email !== confirmEmail)
      return setError("Both email inputs must match.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters long.");
    if (!agree) return setError("Please accept the terms and conditions.");

    // 1️⃣ 调用注册 API
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      return setError(error || "register failed");
    }

    // 2️⃣ 注册成功后自动登录（JWT）
    await signIn("credentials", { email, password, redirect: false });

    // 3️⃣ 进入下一步
    router.push("/onboarding/step2");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#325C77] px-4 pt-9 pb-3 rounded-b-xl flex justify-between items-center shadow-md">
        <button
          onClick={() => router.push("/welcome")}
          className="text-white text-xl"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-white">Step 1 of 5</span>
      </div>
      <div className="flex-1 p-6 max-w-md w-full mx-auto space-y-14">
        <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="space-y-3">
          <div>
            <label className="block mb-1">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Your Email</label>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">at least 8 letters</p>
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label className="text-sm">
              I agree
              <a href="#" className="text-blue-500 underline">
                User Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 left-0 w-full  p-4 ">
        <button
          onClick={handleNext}
          className=" bg-[#EAD098] text-gray-800 py-3 rounded-xl font-semibold w-full hover:opacity-90 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
