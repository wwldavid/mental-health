// src/app/sign-in/page.js
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // ⚡️ 处理 Email/Password 登录
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // 避免自动跳转，我们手动处理
    });

    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = "/"; // 登录成功后跳转到首页
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>

      <hr />

      <h2>Or Sign In with:</h2>

      {/* Google Sign In */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          padding: "10px",
          margin: "5px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>

      {/* Discord Sign In */}
      <button
        onClick={() => signIn("discord", { callbackUrl: "/" })}
        style={{
          backgroundColor: "#7289da",
          color: "white",
          padding: "10px",
          margin: "5px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign in with Discord
      </button>

      <p>
        Do not have an account? <a href="/sign-up">Sign Up</a>
      </p>
    </div>
  );
}
