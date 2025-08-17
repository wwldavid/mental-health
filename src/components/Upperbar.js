"use client";

import { useSession } from "next-auth/react";

import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Upperbar({ title = "My Center" }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4 pb-2 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)] bg-white">
      <div className="h-[43px] grid grid-cols-[80px_1fr_80px] items-center rounded-b-2xl text-[#325C77]">
        <button
          onClick={() => router.back()}
          className="text-xl hover:text-black justify-self-start"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center text-xl font-semibold">{title}</div>
        <div className="relative flex gap-2  items-center justify-self-end">
          <div
            className="w-[43px] h-[43px]"
            onClick={() => router.push("/wellness")}
          >
            <Image
              src="/images/heart_plus.svg"
              width={43}
              height={43}
              alt="wellness icon"
              className="w-full h-full  object-cover "
            />
          </div>
          <div
            className={`w-[43px] h-[43px] rounded-full overflow-hidden cursor-pointer ${
              status === "authenticated" ? "" : "filter grayscale opacity-50"
            } `}
            onClick={() => router.push("/settings")}
          >
            <Image
              src="/images/person.svg"
              width={43}
              height={43}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
