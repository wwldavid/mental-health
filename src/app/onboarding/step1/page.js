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
    if (!name || !email) return setError("姓名和邮箱不能为空");
    if (email !== confirmEmail) return setError("两次邮箱输入不一致");
    if (password.length < 8) return setError("密码至少 8 位");
    if (!agree) return setError("请先同意条款");

    // 1️⃣ 调用注册 API
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      return setError(error || "注册失败");
    }

    // 2️⃣ 注册成功后自动登录（JWT）
    await signIn("credentials", { email, password, redirect: false });

    // 3️⃣ 进入下一步
    router.push("/onboarding/step2");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mt-10 mb-6">
        <button
          onClick={() => router.push("/welcome")}
          className="text-gray-600 text-xl"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-gray-600">Step 1 of 5</span>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="space-y-4">
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
            和
            <a href="#" className="text-blue-500 underline">
              Privacy Policy
            </a>
          </label>
        </div>
        <button
          onClick={handleNext}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
