// app/api/chats/route.js
import prisma from "@/lib/prisma"; // 你的 prisma client 实例

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = Number(searchParams.get("userId"));
  const filter = searchParams.get("filter") || "all";

  // 找到所有该 userId 参与的 ChatUser 记录，连带把 chat、users、messages 拉出来
  const chatUsers = await prisma.chatUser.findMany({
    where: { userId },
    include: {
      chat: {
        include: {
          users: {
            include: { user: true },
          },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1, // 只要最新一条
          },
        },
      },
    },
  });

  let chats = chatUsers.map((cu) => {
    const { chat } = cu;
    // 找到对方 user（participant 里不是自己那个）
    const otherParticipant = chat.users.find((u) => u.userId !== userId);
    if (!otherParticipant) {
      return null; // 或者继续下一个 chat
    }
    const other = otherParticipant.user;
    const lastMsg = chat.messages[0];
    const unreadCount = chat.messages.reduce(
      (sum, m) => sum + (m.isRead === false && m.senderId !== userId ? 1 : 0),
      0
    );
    return {
      id: chat.id,
      user: {
        id: other.id,
        name: other.name,
        avatarUrl: other.avatarUrl,
      },
      lastMessage: lastMsg?.content ?? "",
      unreadCount,
    };
  });

  if (filter === "unread") {
    chats = chats.filter((c) => c.unreadCount > 0);
  }

  return new Response(JSON.stringify(chats), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
