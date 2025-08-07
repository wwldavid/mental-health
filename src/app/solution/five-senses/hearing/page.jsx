// src/app/solution/five-senses/hearing/page.jsx
"use client";
import Link from "next/link";
import Image from "next/image";

export default function HearingPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Five Senses Check-in</h2>
      <div className="relative h-72 mt-4 p-6 rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.50)]">
        <span className="text-neutral-700 text-xl font-bold">
          Notice 3 things you can hear.
        </span>
        <div className="mt-7 w-40 h-28 text-neutral-700 text-base font-bold leading-7">
          Listen closely. What sounds are near? Far? Even silence counts.
        </div>
        <Image
          src="/images/hearing.png"
          alt="Sight icon"
          width={90}
          height={90}
          className="absolute bottom-1 right-4"
        />
      </div>

      <div className="fixed bottom-20 left-0 w-full p-4">
        <Link href="/solution/five-senses/smell">
          <button className="w-full py-2 bg-[#4782A9] text-lg text-white font-bold rounded-3xl shadow-md">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
