// src/app/page.js
import { redirect } from "next/navigation";

export default function Page() {
  // 每次访问根路由就跳到 /welcome
  redirect("/welcome");
}
