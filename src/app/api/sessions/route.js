// src/app/api/sessions/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/en"; // 确保使用英文地区

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("en"); // 设置为英文

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      sessionsAsUser: {
        include: {
          provider: {
            include: { user: true },
          },
        },
      },
    },
  });
  return NextResponse.json(user?.sessionsAsUser ?? []);
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { providerId, date, time } = await req.json();
    const year = new Date().getFullYear();
    const raw = `${date}, ${year} ${time}`;
    console.log("▶️ raw:", raw);

    // 使用更可靠的解析方法
    let scheduledAt;

    console.log("▶️ Attempting to parse with different methods...");

    // 方法1: 直接用 JavaScript Date 构造函数
    try {
      scheduledAt = new Date(raw);
      console.log("▶️ Method 1 (JS Date):", scheduledAt);
      if (isNaN(scheduledAt.getTime())) {
        throw new Error("Invalid date");
      }
    } catch (e) {
      console.log("▶️ Method 1 failed, trying method 2");

      // 方法2: 手动解析并重构
      try {
        // 解析日期部分: "Thursday, August 8"
        const dateMatch = date.match(/(\w+),\s*(\w+)\s*(\d+)/);
        if (!dateMatch) {
          throw new Error("Cannot parse date part");
        }

        const [, weekday, month, day] = dateMatch;

        // 解析时间部分: "12:00pm"
        const timeMatch = time.match(/(\d{1,2}):(\d{2})(am|pm)/i);
        if (!timeMatch) {
          throw new Error("Cannot parse time part");
        }

        let [, hours, minutes, period] = timeMatch;
        hours = parseInt(hours);
        minutes = parseInt(minutes);

        // 转换为24小时制
        if (period.toLowerCase() === "pm" && hours !== 12) {
          hours += 12;
        } else if (period.toLowerCase() === "am" && hours === 12) {
          hours = 0;
        }

        // 月份映射
        const monthMap = {
          January: 0,
          February: 1,
          March: 2,
          April: 3,
          May: 4,
          June: 5,
          July: 6,
          August: 7,
          September: 8,
          October: 9,
          November: 10,
          December: 11,
        };

        const monthIndex = monthMap[month];
        if (monthIndex === undefined) {
          throw new Error(`Unknown month: ${month}`);
        }

        // 使用 Date 构造函数创建日期
        scheduledAt = new Date(year, monthIndex, parseInt(day), hours, minutes);
        console.log("▶️ Method 2 (manual parsing):", scheduledAt);

        if (isNaN(scheduledAt.getTime())) {
          throw new Error("Invalid date after manual parsing");
        }
      } catch (e2) {
        console.log("▶️ Method 2 failed, trying method 3");

        // 方法3: 使用更简单的格式
        try {
          // 创建一个标准格式的字符串: "August 8, 2025 12:00 PM"
          const standardFormat = `${
            date.split(", ")[1]
          }, ${year} ${time.toUpperCase()}`;
          console.log("▶️ Standard format:", standardFormat);

          scheduledAt = new Date(standardFormat);
          console.log("▶️ Method 3 (standard format):", scheduledAt);

          if (isNaN(scheduledAt.getTime())) {
            throw new Error("Invalid date with standard format");
          }
        } catch (e3) {
          throw new Error(`All parsing methods failed. Original: ${raw}`);
        }
      }
    }

    if (isNaN(scheduledAt.getTime())) {
      throw new Error(
        `Cannot parse datetime: ${raw}. Please check the date and time format.`
      );
    }

    // 获取当前用户
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 创建新会话
    const newSession = await prisma.therapySession.create({
      data: {
        userId: user.id,
        providerId: Number(providerId),
        scheduledAt,
        status: "booked",
      },
      include: {
        provider: {
          include: { user: true },
        },
      },
    });
    console.log("🔥 Created session:", newSession);
    return NextResponse.json(newSession, { status: 201 });
  } catch (err) {
    console.error("❌ POST /api/sessions error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
