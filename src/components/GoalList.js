"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Edit2 } from "lucide-react";

export default function GoalList({ initialGoals, status }) {
  const router = useRouter();
  const [goals, setGoals] = useState(initialGoals);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setGoals(initialGoals);
  }, [initialGoals]);

  // 删除
  const handleDelete = async (id) => {
    await fetch(`/api/goals/${id}`, { method: "DELETE" });
    setGoals(goals.filter((g) => g.id !== id));
    setDeletingId(null);
  };

  // 步骤勾选
  const toggleStep = async (goalId, stepId, completed) => {
    // （1）先更新后端
    await fetch(`/api/steps/${stepId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    // （2）基于当前 state 计算新的 goals 数组
    const newGoals = goals.map((g) => {
      if (g.id !== goalId) return g;
      const newSteps = g.steps.map((s) =>
        s.id === stepId ? { ...s, completed: !completed } : s
      );
      return { ...g, steps: newSteps };
    });

    // （3）更新 state
    setGoals(newGoals);

    // （4）检查刚更新的那个 goal：如果它的所有 steps 都完成了，就自动切到 ACHIEVED
    // const updated = newGoals.find((g) => g.id === goalId);
    // if (updated && updated.steps.every((s) => s.completed)) {
    //   await changeStatus(goalId, "ACHIEVED");
    // }
  };

  // 状态切换（New → InProgress／InProgress → Achieved)
  const changeStatus = async (id, newStatus) => {
    const res = await fetch(`/api/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) {
      console.error("Update failed", await res.text());
      return;
    }
    // 1) 把已经启动（状态改过）的 goal 从列表里移除
    setGoals((prev) => prev.filter((g) => g.id !== id));
    // （可选）如果希望自动跳到 In Progress 页，可以：
    router.push(`/goals/list?status=${newStatus}`);
    router.refresh();
  };

  return (
    <div className="space-y-6 h-[600px] overflow-y-auto">
      {goals.map((g) => (
        <div
          key={g.id}
          className="p-4 bg-white rounded-lg border-2 shadow-lg relative"
        >
          {/* 标题 + 编辑/删 附件 */}
          <div className="flex justify-between items-center ">
            <h3
              className={`text-lg font-semibold ${
                status === "ACHIEVED" ? "text-green-500 line-through" : ""
              }`}
            >
              {g.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => router.push(`/goals/new?id=${g.id}`)}
                className="w-8 h-8 bg-[#4782A9] rounded flex items-center justify-center"
              >
                <Edit2 className="text-white" size={16} />
              </button>
              <button
                onClick={() => setDeletingId(g.id)}
                className="w-8 h-8 bg-[#4782A9] rounded flex items-center justify-center"
              >
                <X className="text-white" size={16} />
              </button>
            </div>
          </div>

          {/* 描述 */}
          {g.description && (
            <p className="mt-2 text-gray-700">{g.description}</p>
          )}

          {/* New 状态：创建时间 + Start 按钮 */}
          {status === "NOT_STARTED" && (
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(g.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => changeStatus(g.id, "IN_PROGRESS")}
                className="px-4 py-1 bg-[#4782A9] text-white  w-40 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] flex justify-center items-center"
              >
                Start
              </button>
            </div>
          )}

          {/* In Progress 状态：步骤 & 进度条 */}
          {status === "IN_PROGRESS" && (
            <div className="mt-4 space-y-3">
              {g.steps.map((s) => (
                <div key={s.id} className="flex justify-between items-center">
                  <span>{s.title}</span>
                  <input
                    type="checkbox"
                    checked={s.completed}
                    onChange={() => toggleStep(g.id, s.id, s.completed)}
                    className="w-5 h-5 appearance-none border-2 border-gray-500 rounded relative checked:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    style={{
                      backgroundImage: s.completed
                        ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%2316a34a' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L6 9.793l7.146-7.147a.5.5 0 0 1 .708.708z' stroke='%2316a34a' stroke-width='1'/%3e%3c/svg%3e")`
                        : "none",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "18px 18px",
                    }}
                  />
                </div>
              ))}
              <div className="mt-3">
                {/* 进度百分比 */}
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      (g.steps.filter((s) => s.completed).length /
                        (g.steps.length || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
                {/* 进度条 */}
                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{
                      width: `${Math.round(
                        (g.steps.filter((s) => s.completed).length /
                          (g.steps.length || 1)) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => changeStatus(g.id, "ACHIEVED")}
                className="flex items-center justify-center w-3/4 mx-auto py-1 bg-[#4782A9] text-base text-white font-bold rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
              >
                Mark Completed
              </button>
            </div>
          )}

          {/* Achieved 状态：完成时间 */}
          {status === "ACHIEVED" && (
            <div className="mt-4 text-sm text-gray-600">
              Completed on{" "}
              {new Date(g.completedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}

          {/* 删除确认对话框 */}
          {deletingId === g.id && (
            <div className="fixed inset-0 bg-black/10  flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-80">
                <p className="text-lg font-bold">
                  Are you sure you want to delete this goal? This action cannot
                  be undone.
                </p>
                <div className="mt-3 flex justify-around gap-2">
                  <button
                    onClick={() => setDeletingId(null)}
                    className="px-8 py-1 bg-[#dd7373] text-white rounded-3xl shadow"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="px-8 py-1 bg-[#4782A9] text-white rounded-3xl shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 只有 New 状态才显示「Create New Goal」按钮 */}
      {status === "NOT_STARTED" && (
        <div className="fixed bottom-20 left-0 w-full p-4">
          <button
            onClick={() => router.push("/goals/new")}
            className="flex items-center justify-center w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)]"
          >
            Create New Goal
          </button>
        </div>
      )}
    </div>
  );
}
