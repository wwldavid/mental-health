// src/components/ProviderCard.jsx
"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const buttonStyle =
  "w-80 h-10 py-2.5 bg-orange-200 rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] justify-center items-center text-center text-neutral-700 text-lg font-bold ";

export default function ProviderCard({
  mode = "mine",
  session,
  provider,
  onJoin,
  onCancel,
  onBook,
  onMessage,
  onView,
}) {
  if (mode === "mine" && session) {
    return (
      <div className="w-96 h-96  p-4 flex flex-col justify-between rounded-2xl bg-[url('/provider_bg1.webp')] bg-cover bg-center border border-neutral-700">
        <div className="flex">
          <Image
            src={session.provider.image || "/avatar-placeholder.png"}
            alt={session.provider.user.name}
            width={144}
            height={144}
            className="w-36 h-36 rounded-2xl border border-neutral-700"
          />
          <div className="ml-4 text-sm flex flex-col justify-center gap-4">
            <div className="text-center text-neutral-700 text-lg font-extrabold">
              {session.provider.user.name}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-neutral-700 text-base font-bold">
                Next session on
              </div>
              <div className="text-blue-400 text-base font-extrabold">
                {new Date(session.scheduledAt).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={onMessage}
            className={buttonStyle}
          >
            Message
          </Button>
          <Button onClick={onJoin} className={buttonStyle}>
            Join Session
          </Button>
          <Button
            variant="destructive"
            onClick={onCancel}
            className={buttonStyle}
          >
            Cancel Session
          </Button>
          <Button variant="secondary" onClick={onBook} className={buttonStyle}>
            Book Session
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "find" && provider) {
    return (
      <div
        onClick={onView}
        className="cursor-pointer w-96 h-[556px] p-4 rounded-2xl flex flex-col bg-[url('/provider_bg2.png')] bg-cover bg-center outline outline-1 outline-offset-[-1px] outline-neutral-700"
      >
        <div className="flex gap-5">
          <Image
            src={provider.image || "/avatar-placeholder.png"}
            alt={provider.user.name}
            width={144}
            height={144}
            className="w-36 h-36 rounded-2xl border border-neutral-700"
          />
          <div className="flex flex-col justify-center gap-2">
            <div className="text-center text-neutral-700 text-lg font-extrabold">
              {provider.user.name}
            </div>
            <div className="w-40 text-neutral-700/70 text-base font-medium">
              {provider.desc}
            </div>

            <div className="w-40 text-neutral-700 text-base ">
              <span className="font-extrabold">Specialities:</span> <br />
              <span className="font-medium"> {provider.specialties}</span>
            </div>
          </div>
        </div>
        <div className="mt-20 p-1 text-base text-neutral-700 font-extrabold leading-7">
          {provider.bio}
        </div>
      </div>
    );
  }

  return null;
}
