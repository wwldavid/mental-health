"use client";
import { Button } from "@/components/ui/button";
import StartSession from "@/components/StartSession";

import { useRouter } from "next/navigation";

export default function ConsultTherapist() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-14">
          <h1 className="text-3xl font-bold mb-6">Talk to a therapist</h1>
          <Button
            variant="outline"
            className="mb-6 bg-[#8b968d] text-white"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <StartSession />
        </div>
      </div>
    </div>
  );
}
