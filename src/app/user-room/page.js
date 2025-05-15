"use client";
import { Button } from "@/components/ui/button";
import StartSession from "@/components/StartSession";

import { useRouter } from "next/navigation";

export default function UserRoom() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.back()}
        >
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-6">User Room</h1>

        <div className="flex flex-wrap justify-center gap-4">
          <StartSession />
        </div>
      </div>
    </div>
  );
}
