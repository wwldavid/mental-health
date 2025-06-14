// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  // 1. 造两个用户
  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      password: await bcrypt.hash("password123", 10),
      // 如果你在模型里用了 image 字段，可以给个默认头像
      image: `https://avatars.dicebear.com/api/identicon/${encodeURIComponent(
        "alice@example.com"
      )}.svg`,
    },
  });
  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: await bcrypt.hash("password123", 10),
      image: `https://avatars.dicebear.com/api/identicon/${encodeURIComponent(
        "bob@example.com"
      )}.svg`,
    },
  });

  // 2. 新建一个 Chat
  const chat = await prisma.chat.create({ data: {} });

  // 3. 关联 Alice 和 Bob
  await prisma.chatUser.createMany({
    data: [
      { chatId: chat.id, userId: alice.id },
      { chatId: chat.id, userId: bob.id },
    ],
  });

  // 4. 在这个 Chat 里插入几条消息
  await prisma.message.createMany({
    data: [
      {
        chatId: chat.id,
        senderId: alice.id,
        content: "Hi Bob，这里是 Alice。",
      },
      {
        chatId: chat.id,
        senderId: bob.id,
        content: "你好 Alice，我已经收到啦！",
      },
    ],
  });

  console.log("🎉 Seed 数据已创建：", { alice, bob, chat });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
