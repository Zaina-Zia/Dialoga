"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Mobile chat-view header matching the provided spec
// 390w container, 74px total header area with 45px row content and a 390px divider
const ChatViewHeader: React.FC<{ name?: string } & { hideBack?: boolean }> = ({ name = "Name of Customer", hideBack }) => {
  const router = useRouter();
  return (
    <header className="w-full grid place-items-center">
      <div className="w-full max-w-[390px] flex flex-col items-center gap-3">
        {/* Row: back + avatar + name (45px high) */}
        <div className="w-[390px] h-[45px] flex items-center justify-center">
          <div className="w-[374px] flex items-center justify-between">
            {/* Back (20x20) */}
            {hideBack ? (
              <div className="w-[20px] h-[20px]" />
            ) : (
              <button aria-label="Back" onClick={() => router.back()} className="grid place-items-center w-[20px] h-[20px]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 6L8 12L14 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            {/* Avatar + Name (242x45) */}
            <div className="w-[242px] h-[45px] flex items-center gap-2">
              <div className="h-[45px] w-[45px] grid place-items-center">
                <div className="h-[36px] w-[36px] rounded-full" style={{ background: "rgba(9, 181, 88, 0.25)" }} />
              </div>
              <div className="text-[21px] leading-[25px] font-semibold text-black">{name}</div>
            </div>
            {/* Spacer to balance back icon */}
            <div className="w-[20px] h-[20px]" />
          </div>
        </div>
        {/* Divider (390px) */}
        <div className="w-[390px] border-t border-black" />
      </div>
    </header>
  );
};

export default ChatViewHeader;
