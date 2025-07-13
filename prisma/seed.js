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
      role: "volunteer",
      // Alice 专属 Provider 内容
      bio: "I support individuals navigating anxiety, overwhelm, and the mental load of daily life. My approach is grounded, compassionate, and focused on helping you find steadiness in moments of stress. Whether you're feeling stuck, overstimulated, or just need space to breathe and sort through things, I am here to listen and guide without judgment.",
      specialties: "anxiety, stress",
      rateInfo: "Jane accepts flexible payments",
      languages: "English",
      availability: "Monday-Wednesday 9:00am-17:00pm",
      desc: "Calm and compassionate",
    },
    {
      name: "Dr. Bob",
      email: "bob@therapy.com",
      image: "/experts/bob.png",
      password: "12345678",
      role: "counselor",
      // Bob 专属 Provider 内容
      bio: "I work with people facing low mood, self-doubt, and the weight that often comes with depression. My approach is straightforward but supportive — I'll meet you where you are without sugarcoating or judgment. Whether you're struggling to find motivation or feeling stuck in your own head, I am here to help you get clearer, steadier, and more in touch with your own sense of worth.",
      specialties: "depression, self-esteem",
      rateInfo: "First session free",
      languages: "English, Spanish",
      availability: "Tuesday-Thursday 10:00am-18:00pm",
      desc: "Attentive and empathetic",
    },
    {
      name: "Dr. Carol",
      email: "carol@therapy.com",
      image: "/experts/carol.png",
      password: "12345678",
      role: "counselor",
      // Carol 专属 Provider 内容
      bio: "Specializing in life transitions, I am here to support you through change. My approach is compassionate and client-centered, focusing on building resilience and emotional clarity. I believe that every stage of transition also holds the potential for personal growth and renewed purpose. Whether you're facing personal loss, career shifts, or identity changes, we'll navigate the path forward together.",
      specialties: "life transitions, grief",
      rateInfo: "Insurance accepted",
      languages: "English, French",
      availability: "Monday, Friday 11:00am-16:00pm",
      desc: "Insightful and supportive",
    },
  ];

  // 1) 先 upsert User
  const createdUsers = [];
  for (const e of experts) {
    const hashed = await bcrypt.hash(e.password, 10);
    const user = await prisma.user.upsert({
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
    createdUsers.push(user);
  }

  // 2) 再为这些用户在 Provider 表里 upsert 对应行
  for (let i = 0; i < createdUsers.length; i++) {
    const user = createdUsers[i];
    // 对应上面 experts 数组里的第 i 个对象
    const e = experts[i];
    await prisma.provider.upsert({
      where: { userId: user.id },
      update: {
        bio: e.bio,
        specialties: e.specialties,
        rateInfo: e.rateInfo,
        languages: e.languages,
        availability: e.availability,
        image: user.image,
        desc: e.desc || "",
      },
      create: {
        userId: user.id,
        bio: e.bio,
        specialties: e.specialties,
        rateInfo: e.rateInfo,
        languages: e.languages,
        availability: e.availability,
        image: user.image,
        desc: e.desc || "",
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
