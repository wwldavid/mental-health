"use client";
import React from "react";
import Image from "next/image";

const buttonStyle =
  "w-36 h-9 bg-orange-200 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] flex items-center justify-center text-neutral-700 text-base font-bold ";

export default function ProviderDetailCard({ provider, onMessage, onBook }) {
  return (
    <div
      className="w-full mt-28 h-96 p-4 rounded-2xl flex flex-col
                    bg-[url('/provider_bg2.png')] bg-cover bg-center
                    outline outline-1 outline-offset-[-1px] outline-neutral-700"
    >
      <div className="flex">
        <Image
          src={provider.image || "/avatar-placeholder.png"}
          alt={provider.user.name}
          width={144}
          height={144}
          className="w-36 h-36 rounded-2xl border border-neutral-700"
        />
        <div className="ml-4 flex flex-col justify-center gap-1 text-sm">
          <div className="text-lg font-extrabold text-neutral-700 text-center">
            {provider.user.name}
          </div>
          <div className="w-40 text-base text-neutral-700">
            <span className="font-extrabold">Specialties:</span>
            <span className="font-bold"> {provider.specialties}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex-1 overflow-y-auto text-neutral-700 font-extrabold leading-7">
        <div className=" text-base font-medium">{provider.role}</div>

        <div className=" text-base">
          <span className="font-extrabold">Availability:</span> <br />
          <span className="ml-24 text-base font-semibold">
            {provider.availability}
          </span>
        </div>
        <div className="text-base">
          <span className="font-extrabold">Languages:</span>
          <span className="font-semibold"> {provider.languages}</span>
        </div>
        <div className=" text-base">
          <span className="font-extrabold">Rate:</span>
          <span className=" font-semibold"> {provider.rateInfo}</span>
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
