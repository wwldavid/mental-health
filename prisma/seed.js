// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const experts = [
    {
      name: "Dr. Alice",
      email: "alice@therapy.com",
      image: "/experts/alice.png",
      password: "12345678",
      role: "counselor",
    },
    {
      name: "Dr. Bob",
      email: "bob@therapy.com",
      image: "/experts/bob.png",
      password: "12345678",
      role: "counselor",
    },
    {
      name: "Dr. Carol",
      email: "carol@therapy.com",
      image: "/experts/carol.png",
      password: "12345678",
      role: "counselor",
    },
  ];

  for (const e of experts) {
    const hashed = await bcrypt.hash(e.password, 10);
    await prisma.user.upsert({
      where: { email: e.email },
      update: { password: hashed, role: e.role },
      create: {
        name: e.name,
        email: e.email,
        image: e.image,
        password: hashed,
        role: e.role,
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
