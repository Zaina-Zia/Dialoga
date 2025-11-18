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
        <div className="w-full h-[45px] flex items-center justify-center relative">
          {!hideBack && (
            <button
              type="button"
              aria-label="Back"
              onClick={() => router.back()}
              className="w-[20px] h-[20px] inline-flex items-center justify-center absolute left-0"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 6L8 12L14 18"
                  stroke="#464646"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
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
