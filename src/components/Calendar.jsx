// src/components/Calendar.jsx
"use client";
import React from "react";
import dayjs from "dayjs";

export default function Calendar({ year, month, sessions }) {
  const firstOfMonth = dayjs(`${year}-${String(month).padStart(2, "0")}-01`);
  const startDay = firstOfMonth.day(); // 0 (Sunday) to 6
  const daysInMonth = firstOfMonth.daysInMonth();

  // 构建日历格子
  const weeks = [];
  let dayCounter = 1 - startDay;

  while (dayCounter <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++, dayCounter++) {
      if (dayCounter > 0 && dayCounter <= daysInMonth) {
        const dateKey = firstOfMonth.date(dayCounter).format("YYYY-MM-DD");
        const daySessions = sessions.filter(
          (s) => dayjs(s.scheduledAt).format("YYYY-MM-DD") === dateKey
        );
        week.push({ day: dayCounter, sessions: daySessions });
      } else {
        week.push(null);
      }
    }
    weeks.push(week);
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-96 h-auto bg-zinc-100 p-2">
      <div className="text-center font-medium">
        {firstOfMonth.format("MMMM YYYY")}
      </div>

      <div className="grid grid-cols-7 text-xs text-center mt-2">
        {weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 gap-1 mt-1 text-xs">
        {weeks.flat().map((cell, idx) =>
          cell ? (
            <div key={idx} className="border p-1 text-[10px]">
              <div className="font-semibold">{cell.day}</div>
              {cell.sessions.map((s) => (
                <div key={s.id} className="mt-1">
                  Session at {dayjs(s.scheduledAt).format("h:mm A")}
                </div>
              ))}
            </div>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </div>
  );
}
