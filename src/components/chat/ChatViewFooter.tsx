"use client";
import React from "react";

// Mobile chat-view footer/input bar matching the provided spec
// 392x40 container, bg #464646, padding 8 16, gap 8, icons 24, center pill 264x23
const ChatViewFooter: React.FC<{
  onPlus?: () => void;
  onAttach?: () => void;
  onSend?: () => void;
}> = ({ onPlus, onAttach, onSend }) => {
  return (
    <div className="w-full max-w-[390px] h-[40px] bg-[#464646] px-4 py-2 flex items-center gap-2">
      {/* Plus icon */}
      <button type="button" aria-label="Add" onClick={onPlus} className="h-6 w-6 grid place-items-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Input pill */}
      <div className="h-[23px] w-[264px] bg-[#D9D9D9] rounded-[10px]" />
      {/* Attach */}
      <button type="button" aria-label="Attach" onClick={onAttach} className="h-6 w-6 grid place-items-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="7" width="14" height="10" rx="2" stroke="#E3E3E3" strokeWidth="2" />
          <path d="M5 9l7 5 7-5" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Send */}
      <button type="button" aria-label="Send" onClick={onSend} className="h-6 w-6 grid place-items-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default ChatViewFooter;
