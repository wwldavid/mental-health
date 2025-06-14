// app/api/chats/route.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ← 这里改成你的实际路径
import prisma from "@/lib/prisma";

export async function GET(request) {
  // 1. 拿 session
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. 从 session 拿 userId 和 role
  const userId = session.user.id;
  const role = session.user.role; // "user" 或 "counselor"

  // 3. 拿前端传来的 filter 参数
  const filter = request.nextUrl.searchParams.get("filter") || "all";

  // 4. 查询当前用户所有会话
  const chatUsers = await prisma.chatUser.findMany({
    where: { userId },
    include: {
      chat: {
        include: {
          users: { include: { user: true } },
          messages: { orderBy: { createdAt: "desc" }, take: 1 },
        },
      },
    },
  });

  // 5. 组装返回数据格式
  let chats = chatUsers
    .map((cu) => {
      const { chat } = cu;
      const other = chat.users.find((u) => u.userId !== userId)?.user;
      if (!other) return null;
      const lastMsg = chat.messages[0];
      const unreadCount = chat.messages.reduce(
        (sum, m) => sum + (m.isRead === false && m.senderId !== userId ? 1 : 0),
        0
      );
      return {
        id: chat.id,
        user: { id: other.id, name: other.name, image: other.image },
        lastMessage: lastMsg?.content || "",
        unreadCount,
      };
    })
    .filter(Boolean);

  // 6. 如果只看未读
  if (filter === "unread") {
    chats = chats.filter((c) => c.unreadCount > 0);
  }

  return new Response(JSON.stringify(chats), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
