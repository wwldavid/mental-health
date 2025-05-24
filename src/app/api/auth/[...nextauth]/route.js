import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ 使用统一的 authOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
