// src/components/Calendar.jsx
"use client";
import React, { useRef, useEffect } from "react";
import dayjs from "dayjs";

export default function Calendar({ year, month, sessions }) {
  // 当月第一天和天数
  const firstDay = dayjs(`${year}-${String(month).padStart(2, "0")}-01`);
  const daysInMonth = firstDay.daysInMonth();
  const firstDayOfWeek = firstDay.day(); // 0=Sun

  // 总列数和每行列数
  const rows = 2;
  const totalCols = firstDayOfWeek + daysInMonth;
  const colsPerRow = Math.ceil(totalCols / rows);

  // 生成单元格数据
  const cells = Array.from({ length: rows * colsPerRow }, (_, idx) => {
    const dayPosition = idx + 1 - firstDayOfWeek;
    if (dayPosition >= 1 && dayPosition <= daysInMonth) {
      const dateObj = firstDay.date(dayPosition);
      const dateKey = dateObj.format("YYYY-MM-DD");
      const daySessions = sessions.filter(
        (s) => dayjs(s.scheduledAt).format("YYYY-MM-DD") === dateKey
      );
      return { day: dayPosition, sessions: daySessions };
    }
    return { day: null, sessions: [] };
  });

  // 滚动引用
  const scrollRef = useRef(null);
  const gridRef = useRef(null);

  // 默认滚动到首个 session
  useEffect(() => {
    if (sessions.length && scrollRef.current && gridRef.current) {
      const firstDate = dayjs(sessions[0].scheduledAt).date();
      const cellEl = gridRef.current.querySelector(`[data-day="${firstDate}"]`);
      if (cellEl)
        scrollRef.current.scrollLeft = Math.max(0, cellEl.offsetLeft - 56);
    }
  }, [sessions]);

  const colSize = "3.5rem";

  return (
    <div ref={scrollRef} className="w-full bg-zinc-100 p-2 overflow-x-auto">
      {/* 日期网格，无星期标签 */}
      <div
        ref={gridRef}
        className="grid text-xs text-center gap-1"
        style={{
          gridTemplateColumns: `repeat(${colsPerRow}, ${colSize})`,
          gridTemplateRows: `repeat(${rows}, auto)`,
        }}
      >
        {cells.map((cell, idx) => (
          <div
            key={idx}
            data-day={cell.day}
            className={`border h-20 p-1 text-[10px] flex flex-col ${
              cell.day
                ? cell.sessions.length
                  ? "bg-lime-300 border-lime-400"
                  : "bg-white border-gray-200"
                : "border-transparent"
            }`}
          >
            {cell.day && (
              <>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{cell.day}</span>
                  <span className="text-[8px] text-gray-500">
                    {dayjs(
                      `${year}-${String(month).padStart(2, "0")}-${String(
                        cell.day
                      ).padStart(2, "0")}`
                    ).format("ddd")}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto text-[9px] leading-tight">
                  {cell.sessions.map((s) => (
                    <div key={s.id} className="mb-1">
                      <div className="font-medium text-[9px]">
                        {s.provider.user.name}
                      </div>
                      <div className="text-[8px]">
                        {dayjs(s.scheduledAt).format("MMM D, YYYY h:mm A")}
                      </div>
                      <div className="text-[8px] capitalize">{s.status}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
