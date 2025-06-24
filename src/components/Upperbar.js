import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Upperbar({ title = "My Center" }) {
  const router = useRouter();

  return (
    <div className="fixed top-4 h-[59px] left-0 w-full bg-white shadow-sm px-4 py-2 mb-6 flex items-center justify-between">
      <button
        onClick={() => router.back()}
        className="text-xl text-gray-600 hover:text-black"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="text-lg font-semibold text-gray-800">{title}</div>
      <div className="flex gap-2 p-2">
        <div
          className="w-[43px] h-[43px] rounded-full"
          onClick={() => router.push("/wellness")}
        >
          <Image
            src="/images/wellness.png"
            width={10}
            height={10}
            alt="wellness icon"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[43px] h-[43px] rounded-full">
          <Image
            src="/images/avatar.png"
            width={10}
            height={10}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
