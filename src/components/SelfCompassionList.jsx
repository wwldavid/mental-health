"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, X } from "lucide-react";

export default function SelfCompassionList({ entriesByCategory }) {
  const [showConfirmId, setShowConfirmId] = useState(null);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/solution/self-compassion/entries/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      // 删除成功后刷新页面或可改为更优的状态更新
      window.location.reload();
    }
  };

  return (
    <div className="mt-16 p-6 pb-56">
      {/* 标题 */}
      <h2 className="text-xl font-semibold">Self Compassion</h2>
      <div className="mt-4 p-1 space-y-4 h-[570px]">
        {/* 按类别渲染条目 */}
        {Object.entries(entriesByCategory).map(([cat, list]) =>
          list.length > 0 ? (
            <section key={cat}>
              <div className="mt-2 space-y-4 ">
                {list.map((e) => (
                  <div
                    key={e.id}
                    className="p-4 rounded-2xl bg-[url('/comp_bg2.png')] bg-cover bg-center shadow-[0px_0px_6px_0px_rgba(0,0,0,0.50)] relative"
                  >
                    {/* 日期 + 编辑 / 删除 */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(e.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <div className="flex space-x-2">
                        <Link href={`/solution/self-compassion/${e.id}/edit`}>
                          <button className="w-6 h-6 bg-[#4782A9] rounded flex items-center justify-center">
                            <Edit2 className="text-white" size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => setShowConfirmId(e.id)}
                          className="w-6 h-6 bg-[#4782A9] rounded flex items-center justify-center"
                        >
                          <X className="text-white" size={16} />
                        </button>
                      </div>
                    </div>

                    {/* 内容 */}
                    <p className="mt-2 pb-6 text-gray-700">{e.content}</p>

                    {/* 类别标签 */}
                    <span className="absolute bottom-2 right-2 text-neutral-700 text-sm font-semibold">
                      {cat.replace("_", " ")}
                    </span>

                    {/* 删除确认弹窗 */}
                    {showConfirmId === e.id && (
                      <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg w-80">
                          <p className="text-lg font-bold">
                            Are you sure you want to delete this entry? This
                            action cannot be undone.
                          </p>
                          <div className="mt-3 flex justify-around gap-2">
                            <button
                              onClick={() => setShowConfirmId(null)}
                              className="px-8 py-1 bg-[#4782A9] text-white rounded-3xl shadow"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(e.id)}
                              className="px-8 py-1 bg-[#DD7373] text-white rounded-3xl shadow"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
      {/* 新条目按钮 */}
      <div className="fixed bottom-20 left-0 w-full p-4">
        <Link href="/solution/self-compassion/reflect">
          <button className="flex items-center justify-center w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]">
            New Entry
          </button>
        </Link>
      </div>
    </div>
  );
}
