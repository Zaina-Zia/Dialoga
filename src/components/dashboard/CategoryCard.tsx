"use client";
import React from "react";

type Props = {
  iconSrc: string;
  iconAlt?: string;
  label: string;
  // precise sizing
  innerW: number; // e.g., 66, 90, 38, 81, 85
  innerH: number; // e.g., 44, 45, 44, 44, 48
  textW: number;  // label block width
  textH: number;  // label block height
  gap: number;    // gap between icon and label
  labelFontSize: number; // 12 or 10
  labelLineHeight: number; // 18 or 15
  className?: string;
};

export function CategoryCard({
  iconSrc,
  iconAlt = "",
  label,
  innerW,
  innerH,
  textW,
  textH,
  gap,
  labelFontSize,
  labelLineHeight,
  className,
}: Props) {
  return (
    <div className={"relative w-[110px] h-[70px]" + (className ? ` ${className}` : "")}> 
      <div className="absolute inset-0 bg-[#FDFCFB] border border-[#03121F]/20 rounded-[8px]" />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
        style={{ width: innerW, height: innerH, gap }}
      >
        <img src={iconSrc} alt={iconAlt} width={24} height={24} className="w-[24px] h-[24px] object-contain" />
        <div className="flex items-center justify-center text-black font-medium text-center"
             style={{ width: textW, height: textH, fontSize: labelFontSize, lineHeight: `${labelLineHeight}px` }}>
          {label}
        </div>
      </div>
    </div>
  );
}
