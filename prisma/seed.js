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
    },
    {
      name: "Dr. Bob",
      email: "bob@therapy.com",
      image: "/experts/bob.png",
      password: "12345678",
    },
    {
      name: "Dr. Carol",
      email: "carol@therapy.com",
      image: "/experts/carol.png",
      password: "12345678",
    },
  ];

  for (const e of experts) {
    await prisma.user.upsert({
      where: { email: e.email },
      update: {},
      create: {
        name: e.name,
        email: e.email,
        image: e.image,
        password: e.password,
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
