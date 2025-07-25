"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoalList({ initialGoals }) {
  const [goals, setGoals] = useState(initialGoals);
  const [search, setSeach] = useState("");
  const router = useRouter();

  const fetchGoals = async (statusFilter) => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/goals?${params}`);
    const data = await res.json();
    setGoals(data);
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`/api/goals/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
    fetchGoals();
  };

  const deleteGoal = async (id) => {
    if (!confirm("confirm to delete this goal? ")) return;
    await fetch(`/api/goals/${id}`, { method: "DELETE" });
    fetchGoals();
  };

  return (
    <div className="mt-28 p-4">
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          placeholder="Browse Completed Goals"
          className="flex-1 p-2 border rounded"
          value={search}
          onChange={(e) => setSeach(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchGoals()}
        />
        <button
          className="px-4 py-2 bg-blue-800 text-white rounded"
          onClick={() => fetchGoals()}
        >
          Search
        </button>
      </div>

      <ul className="space-y-3">
        {goals.map((goal) => (
          <li key={goal.id} className=" p-3  ">
            <div className="flex justify-between">
              <span>{goal.title}</span>
              <button
                className="px-2 bg-red-400 text-white rounded"
                onClick={() => deleteGoal(goal.id)}
              >
                Delete
              </button>
            </div>
            <div className="flex items-center space-x-3">
              {["not_start", "in_progress", "achieved"].map((st) => (
                <label key={st} className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name={`status-${goal.id}`}
                    checked={goal.status === st}
                    onChange={() => updateStatus(goal.id, st)}
                  />
                  <span className="capitalize">{st}</span>
                </label>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-blue-800 text-white rounded-lg"
          onClick={() => router.push("/goals/new")}
        >
          New Goal
        </button>
      </div>
    </div>
  );
}
