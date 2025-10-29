"use client";
import React from "react";

type Props = {
  name: string;
  product: string;
  avatarSrc?: string;
};

export function MessageItem({ name, product, avatarSrc = "/images/Dashboard_Home/accountCircle.png" }: Props) {
  return (
    <div className="w-[334px] h-[61px] bg-[#FDFCFB] border border-[#464646]/25 rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] px-1.5 py-2 flex items-center gap-4">
      {/* Avatar */}
      <img src={avatarSrc} alt="avatar" width={45} height={45} className="w-[45px] h-[45px] object-contain" />
      {/* Texts */}
      <div className="w-[261px] h-[43px] flex flex-col gap-1">
        <div className="text-[15px] leading-[22px] font-medium text-black">{name}</div>
        <div className="text-[12px] leading-[18px] font-normal text-black">{product}</div>
      </div>
    </div>
  );
}
