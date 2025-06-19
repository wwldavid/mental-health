// src/components/ProviderCard.jsx
"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProviderCard({
  mode = "mine",
  session,
  provider,
  onJoin,
  onCancel,
  onBook,
  onMessage,
}) {
  if (mode === "mine" && session) {
    return (
      <div className="w-96 h-96 bg-zinc-300 p-4 flex flex-col justify-between">
        <div className="flex">
          <Image
            src={session.provider.image || "/avatar-placeholder.png"}
            alt={session.provider.user.name}
            width={144}
            height={144}
            className="w-36 h-36 bg-lime-50"
          />
          <div className="ml-4 text-sm flex flex-col justify-between">
            <div>{session.provider.user.name}</div>
            <div>Next session on</div>
            <div>
              {new Date(session.scheduledAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
            <Button size="sm" variant="outline" onClick={onMessage}>
              Message
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button onClick={onJoin}>Join Session</Button>
          <Button variant="destructive" onClick={onCancel}>
            Cancel Session
          </Button>
          <Button variant="secondary" onClick={onBook}>
            Book Session
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "find" && provider) {
    return (
      <div className="w-96 h-96 bg-zinc-300 p-4 rounded-2xl flex flex-col">
        <div className="flex">
          <Image
            src={provider.image || "/avatar-placeholder.png"}
            alt={provider.user.name}
            width={160}
            height={144}
            className="w-40 h-36 rounded bg-yellow-200"
          />
          <div className="ml-4 text-sm flex flex-col justify-around">
            <div className="font-semibold">{provider.user.name}</div>

            <div className="mt-1">Specialities: {provider.specialties}</div>
          </div>
        </div>
        <div className="mt-2 text-sm flex-1 overflow-y-auto">
          {provider.bio}
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline" onClick={onMessage}>
            Message
          </Button>
          <Button size="sm" variant="secondary" onClick={onBook}>
            Book Session
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
