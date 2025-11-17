"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Mobile chat-view header matching the provided spec
// 390w container, 74px total header area with 45px row content and a 390px divider
const ChatViewHeader: React.FC<{ name?: string } & { hideBack?: boolean }> = ({ name = "Name of Customer", hideBack }) => {
  const router = useRouter();
  return (
    <header className="w-full grid place-items-center">
      <div className="w-full max-w-[390px] flex flex-col items-center gap-3 px-4 sm:px-5">
        {/* Row: back + avatar + name (45px high) */}
        <div className="w-full h-[45px] flex items-center justify-center">
          <div className="h-[45px] flex items-center justify-center">
            <span className="text-[21px] leading-[32px] font-semibold text-black">{name}</span>
          </div>
        </div>
        {/* Divider (390px) */}
        <div className="w-full max-w-[390px] border-t border-black" />
      </div>
    </header>
  );
};

export default ChatViewHeader;
