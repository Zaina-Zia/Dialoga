"use client";
import React from "react";

type TypingIndicatorProps = {
  isTyping?: boolean;
};

export function TypingIndicator({ isTyping = false }: TypingIndicatorProps) {
  if (!isTyping) return null;

  return (
    <div className="w-full flex justify-start px-4">
      <div className="max-w-[280px] flex items-center gap-1 bg-[#D9D9D9] rounded-[8px] px-3 py-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#464646] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-[#464646] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-[#464646] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <span className="text-[12px] leading-[18px] text-[#464646] ml-2">typing...</span>
      </div>
    </div>
  );
}

