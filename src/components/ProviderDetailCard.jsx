// src>components>ProviderDetailCard.jsx
"use client";
import React from "react";
import Image from "next/image";

const buttonStyle =
  "w-36 h-9 bg-orange-200 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] flex items-center justify-center text-neutral-700 text-base font-bold ";

export default function ProviderDetailCard({ provider, onMessage, onBook }) {
  const [days, hours] = provider.availability.split(" ");
  return (
    <div
      className="w-full mt-28 h-96 p-4 rounded-2xl flex flex-col
                    bg-[url('/provider_bg2.png')] bg-cover bg-center
                    shadow-[0_0_12px_-2px_rgba(0,0,0,0.2)] border border-neutral-200"
    >
      <div className="flex gap-5">
        <Image
          src={provider.image || "/avatar-placeholder.png"}
          alt={provider.user.name}
          width={144}
          height={144}
          className="w-36 h-36 rounded-2xl border border-neutral-700"
        />
        <div className=" flex flex-col justify-center gap-2">
          <div className="text-lg font-extrabold text-neutral-700 text-center">
            {provider.user.name}
          </div>
          <div className="w-40 text-neutral-700/70 text-base font-medium">
            <span> {provider.desc}</span>
          </div>
          <div className="w-40 text-base text-neutral-700">
            <span className="font-extrabold">Specialties:</span>
            <br />
            <span className="font-medium"> {provider.specialties}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex-1 overflow-y-auto text-neutral-700 font-extrabold leading-7">
        <div className=" text-base font-medium">
          <span className="font-extrabold">Role:</span>
          <span className="ml-2 text-base font-medium"></span>
          {provider.user.role}
        </div>

        <div className=" text-base">
          <span className="font-extrabold">Availability:</span> <br />
          <div className="ml-24 flex flex-col">
            <span className="text-base font-semibold">{days}</span>
            <span className="text-sm font-medium">{hours}</span>
          </div>
        </div>
        <div className="text-base">
          <span className="font-extrabold">Languages:</span>
          <span className="ml-2 text-base font-medium">
            {" "}
            {provider.languages}
          </span>
        </div>
        <div className="text-base">
          <span className="font-extrabold">Rate:</span>
          <span className="ml-2 text-base font-medium">
            {" "}
            {provider.rateInfo}
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-2">
        <button className={buttonStyle} onClick={onMessage}>
          Message
        </button>
        <button className={buttonStyle} onClick={onBook}>
          Book Session
        </button>
      </div>
    </div>
  );
}
