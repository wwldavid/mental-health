"use client";
import { useState } from "react";

export default function AssessmentForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    sleepQuality: "5",
    stressLevel: "5",
    mood: "",
    concerns: "",
  });
  const [assessment, setAssessment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAssessment(data.assessment);
    } catch (err) {
      setError("Error generating assessment. Please try again later.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!assessment ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Mental Health Assessment
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Sleep Quality (1-10)
            </label>
            <input
              type="range"
              name="sleepQuality"
              min="1"
              max="10"
              value={formData.sleepQuality}
              onChange={handleChange}
              className="w-full"
              required
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Poor</span>
              <span>Average</span>
              <span>Good</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Stress Level (1-10)
            </label>
            <input
              type="range"
              name="stressLevel"
              min="1"
              max="10"
              value={formData.stressLevel}
              onChange={handleChange}
              className="w-full"
              required
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Recent Mood</label>
            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Mood</option>
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
              <option value="anxious">Anxious</option>
              <option value="angry">Angry</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Main Concerns</label>
            <textarea
              name="concerns"
              value={formData.concerns}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              rows="4"
              placeholder="Please describe any recent mental health concerns..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? "Processing..." : "Get Assessment"}
          </button>

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Your Mental Health Assessment
          </h2>
          <div className="prose max-w-none">
            {assessment.split("\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <button
            onClick={() => setAssessment("")}
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Return
          </button>
        </div>
      )}
    </div>
  );
}
