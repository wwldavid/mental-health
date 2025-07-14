"use client";
import React, { useState } from "react";
import dayjs from "dayjs";

export default function Calendar({ year, month, sessions }) {
  const startDay = dayjs(`${year}-${String(month).padStart(2, "0")}-01`);
  const firstWeekday = startDay.day();

  const totalCells = 6 * 7;
  const [hoverKey, setHoverKey] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  const calendarCells = Array.from({ length: totalCells }).map((_, idx) => {
    const offset = idx - firstWeekday;
    return startDay.add(offset, "day");
  });

  // sessions 按天聚合
  const sessionMap = sessions.reduce((map, s) => {
    const key = dayjs(s.scheduledAt).format("YYYY-MM-DD");
    if (!map[key]) map[key] = [];
    map[key].push(s);
    return map;
  }, {});

  const weekdays = ["s", "m", "t", "w", "t", "f", "s"];

  return (
    <div className="w-full pt-4">
      {/* 周头 */}
      <div className="grid grid-cols-7 text-center font-semibold text-sm mb-2">
        {weekdays.map((wd) => (
          <div key={wd}>{wd}</div>
        ))}
      </div>

      {/* 日期格子 */}
      <div className="grid grid-cols-7 grid-rows-6 gap-1">
        {calendarCells.map((dateObj, idx) => {
          const dateKey = dateObj.format("YYYY-MM-DD");
          const inMonth = dateObj.month() + 1 === Number(month);
          const dayNumber = dateObj.date();
          const hasSessions = !!sessionMap[dateKey]?.length;

          return (
            <div
              key={idx}
              className="relative inline-block"
              onMouseEnter={() => hasSessions && setHoverKey(dateKey)}
              onMouseLeave={() => setHoverKey(null)}
            >
              <div
                className={`h-6 p-1 rounded-sm flex items-center justify-center cursor-pointer ${
                  inMonth ? "text-black" : "text-gray-400"
                }`}
                onClick={() =>
                  hasSessions &&
                  setSelectedKey((prev) => (prev === dateKey ? null : dateKey))
                }
              >
                {hasSessions ? (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600">
                    <span className=" text-white text-sm font-semibold">
                      {dayNumber}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-normal">{dayNumber}</span>
                )}
              </div>

              {/* 弹窗显示 session */}
              {(hoverKey === dateKey || selectedKey === dateKey) && (
                <div className="absolute z-10 bg-[#2a83a2] text-white border shadow-lg p-2 w-28 top-full mt-1">
                  {sessionMap[dateKey].map((s) => (
                    <div
                      key={s.id}
                      className="mb-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedKey(null);
                        setSelectedKey(null);
                        setHoverKey(null);
                      }}
                    >
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
