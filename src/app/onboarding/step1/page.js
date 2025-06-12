"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Step1() {
  const router = useRouter();
  const buttonStyle =
    "w-full h-[46px] mx-auto block bg-[#000] text-white py-2 px-4 rounded mb-4 hover:bg-[#7ebeab] active:bg-[#7ebeab] transition duration-200";

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/welcome")}
          className="text-gray-600 text-xl"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-gray-600">Step 1 of 4</span>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Let is get you signed up</h2>

      <form className="space-y-4">
        <div>
          <label className="block mb-1">What is your name?</label>
          <input className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">What is your email?</label>
          <input className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Confirm your email address</label>
          <input className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Create a password</label>
          <input type="password" className="w-full border p-2 rounded" />
          <p className="text-xs text-gray-500 mt-1">
            Please use at least 8 characters
          </p>
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" />
          <label className="text-sm">
            I agree to the{" "}
            <a href="#" className="text-blue-500 underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="button"
          onClick={() => router.push("/onboarding/step2")}
          className={buttonStyle}
        >
          Next
        </button>
      </form>
    </div>
  );
}
