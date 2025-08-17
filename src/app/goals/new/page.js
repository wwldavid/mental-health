"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewOrEditGoal() {
  const params = useSearchParams();
  const editingId = params.get("id"); // 如果有 id，表示编辑
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!editingId) return;
    fetch(`/api/goals/${editingId}`)
      .then((res) => res.json())
      .then((goal) => {
        setTitle(goal.title);
        setDescription(goal.description || "");
        // 只取 step.title
        setSteps(goal.steps.map((s) => s.title));
      })
      .catch(console.error);
  }, [editingId]);

  const handleAddStep = () => setSteps([...steps, ""]);

  const handleStepChange = (idx, val) => {
    const arr = [...steps];
    arr[idx] = val;
    setSteps(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description, steps };

    if (editingId) {
      // PATCH 更新
      await fetch(`/api/goals/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, steps }),
      });
    }
    router.push("/goals");
    router.refresh();
  };

  return (
    <div className="p-4 mt-16">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Edit Goal" : "New Goals"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className=" max-w-lg mx-auto space-y-2 p-4 rounded-2xl border-2 shadow"
      >
        <input
          type="text"
          required
          placeholder="What’s your goal?"
          className="w-full p-2 font-semibold placeholder-gray-700 text-gray-900 placeholder:font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Describe your goal here"
          className="w-full p-2 "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="space-y-2">
          {steps.map((s, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Step ${idx + 1}`}
              className="w-full p-2"
              value={s}
              onChange={(e) => handleStepChange(idx, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={handleAddStep}
            className="flex items-center"
          >
            <span className="text-2xl leading-none">+</span>
            <span className="text-base ml-2">Add Step</span>
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-1 bg-[#4782A9] text-white 
        w-40 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] flex justify-center items-center font-bold text-base"
          >
            {editingId ? "Save Changes" : "Add Goal"}
          </button>
        </div>
      </form>
    </div>
  );
}
