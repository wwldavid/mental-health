import prisma from "@/lib/prisma";

export async function POST(req) {
  const data = await req.json();

  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
    // 返回 JSON 格式，前端才能解析
    return new Response(
      JSON.stringify({ message: "Message submitted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("❌ Database error:", error.message);
    return new Response(
      JSON.stringify({
        message: "Failed to submit message",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
