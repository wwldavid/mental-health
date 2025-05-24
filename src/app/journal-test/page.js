"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DiaryPage() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [diaries, setDiaries] = useState([]);

  // 获取用户历史日记

  useEffect(() => {
    fetch("/api/diary")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch diaries: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setDiaries(data))
      .catch((error) => {
        console.error(error);
        setDiaries([]); // 如果请求失败，清空列表
      });
  }, []);
  console.log("Session:", session, "Status:", status);

  async function handleSave() {
    if (!content || !session) return;
    try {
      const postRes = await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, isPublic }),
      });

      if (!postRes.ok) {
        throw new Error(`Failed to save diary: ${postRes.status}`);
      }

      setContent("");
      setIsPublic(false);

      const getRes = await fetch("/api/diary");
      if (!getRes.ok) {
        throw new Error(`Failed to fetch diaries: ${getRes.status}`);
      }
      const updated = await getRes.json();
      setDiaries(updated);
    } catch (error) {
      console.error(error);
      // 这里可以显示错误通知给用户
    }
  }

  // ✅ 在 session 加载中时，不渲染主界面
  if (status === "loading") {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Daily Journal
      </h1>
      {session && (
        <div className="text-right mb-4">
          <button
            onClick={() => signOut()}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Sign out
          </button>
        </div>
      )}

      {!session && (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-md mb-6 text-center">
          <p className="text-sm text-gray-700 mb-4">
            Please log in or sign up to write and save your journal entries.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/sign-in?callbackUrl=/journal-test">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/sign-up?callbackUrl=/journal-test">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}

      <Textarea
        rows={6}
        placeholder={
          session ? "How do you feel today?" : "Please log in to write..."
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4"
        disabled={!session}
      />

      <div className="flex items-center space-x-2 mb-6">
        <Checkbox
          id="public"
          checked={isPublic}
          onCheckedChange={setIsPublic}
          disabled={!session}
        />
        <label htmlFor="public" className="text-sm text-gray-700">
          Make this public
        </label>
      </div>

      <Button onClick={handleSave} disabled={!session || !content}>
        Save Entry
      </Button>

      <h2 className="text-2xl font-semibold mt-12 mb-4">
        {session ? "Your Previous Entries" : "Recent Public Entries"}
      </h2>

      {diaries.length > 0 ? (
        <div className="space-y-4">
          {diaries.map((entry) => (
            <div key={entry.id} className="p-4 border rounded-lg shadow-sm">
              <p className="text-gray-800 whitespace-pre-wrap">
                {entry.content}
              </p>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                {new Date(entry.createdAt).toLocaleString()}
                {entry.isPublic && (
                  <span className="ml-2 px-1.5 py-0.5 text-green-700 bg-green-100 rounded text-xs font-semibold">
                    Public
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center">
          {session
            ? "You haven't written any diary entries yet."
            : "No public entries available."}
        </p>
      )}
    </main>
  );
}
