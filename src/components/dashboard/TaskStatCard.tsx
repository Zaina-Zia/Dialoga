"use client";
import React from "react";

type Props = {
  iconSrc: string;
  iconAlt?: string;
  label: string;
  count: number | string;
  className?: string;
  variant?: "narrow" | "wide";
};

export function TaskStatCard({ iconSrc, iconAlt = "", label, count, className, variant = "narrow" }: Props) {
  return (
    <div className={"relative w-[110px] h-[70px]" + (className ? ` ${className}` : "")}> 
      <div className="absolute inset-0 bg-[#FDFCFB] border border-[#03121F]/20 rounded-[8px]" />
      {variant === "narrow" ? (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[58px] h-[63px] flex flex-col items-center">
          <img src={iconSrc} alt={iconAlt} width={24} height={24} className="w-[24px] h-[24px] object-contain" />
          <div className="w-[58px] h-[37px] flex flex-col items-center justify-center gap-[1px]">
            <div className="w-[58px] h-[18px] text-[12px] leading-[18px] font-medium text-center text-black">{label}</div>
            <div className="w-[7px] h-[18px] text-[12px] leading-[18px] font-medium text-center text-black">{count}</div>
          </div>
        </div>
      ) : (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[93px] h-[66px] flex flex-col items-center justify-center gap-[6px]">
          <img src={iconSrc} alt={iconAlt} width={24} height={24} className="w-[24px] h-[24px] object-contain" />
          <div className="w-[93px] h-[36px] flex flex-col items-center justify-center gap-[3px]">
            <div className="w-[93px] h-[15px] text-[10px] leading-[15px] font-medium text-center text-black">{label}</div>
            <div className="w-[7px] h-[18px] text-[12px] leading-[18px] font-medium text-center text-black">{count}</div>
          </div>
        </div>
      )}
    </div>
  );
}
