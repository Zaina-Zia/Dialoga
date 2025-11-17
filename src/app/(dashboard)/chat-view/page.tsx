"use client";
import React, { useState } from "react";
import ChatViewHeader from "../../../components/chat/ChatViewHeader";

export default function ChatViewPage() {
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleAddImage = () => {
    setAttachments((prev) => [...prev, "Image"]);
  };

  const handleRecord = () => {
    setAttachments((prev) => [...prev, "Voice"]);
  };

  return (
    <main className="min-h-screen w-full grid place-items-center bg-[#F5F3F1]">
      <section
        className="w-full max-w-[390px] h-[841px] flex flex-col items-center pt-8 gap-[20px] px-4 sm:px-5"
        style={{ background: "#F5F3F1" }}
      >
        {/* Header */}
        <ChatViewHeader />

        {/* Message area */}
        <div className="flex flex-col items-center justify-between w-full h-[715px]">
          <div className="flex flex-col items-center gap-[16px] w-[280px] h-[134px]">
            {/* Date */}
            <div className="flex justify-center items-center w-[165px] h-[23px] bg-[#D9D9D9] shadow-[0_4px_4px_rgba(0,0,0,0.05)] rounded-[10px]">
              <span className="text-[#464646] text-[15px] leading-[22px] font-medium font-[Poppins]">
                Today
              </span>
            </div>

            {/* Message box */}
            <div className="relative w-[280px] h-[95px] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
              <div className="absolute inset-0 rounded-[8px] bg-[#D9D9D9]" />
              <p className="absolute left-[9px] right-[9px] top-[16px] text-[15px] leading-[22px] text-[#464646] text-center font-[Poppins]">
                Esta persona está interesada en mesa de madera
              </p>
            </div>
          </div>

          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className="w-full flex flex-col items-center mb-4">
              {attachments.map((a, i) => (
                <div key={i} className="text-sm text-[#464646]">
                  Added: {a}
                </div>
              ))}
            </div>
          )}

          {/* Message input bar */}
          <div className="w-full max-w-[390px] h-[40px] bg-[#464646] flex items-center px-4 gap-2">
            {/* Plus icon */}
            <button onClick={handleAddImage} className="h-6 w-6 grid place-items-center" aria-label="Add">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Input field */}
            <div className="flex-1 h-[23px] bg-[#D9D9D9] rounded-[10px]" />

            {/* Camera icon */}
            <button className="h-6 w-6 grid place-items-center" aria-label="Camera">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="7" width="18" height="12" rx="2" stroke="#E3E3E3" strokeWidth="2" />
                <circle cx="12" cy="13" r="3" stroke="#E3E3E3" strokeWidth="2" />
                <path d="M8 7l1.2-2h5.6L16 7" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Mic icon */}
            <button onClick={handleRecord} className="h-6 w-6 grid place-items-center" aria-label="Record">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="5" width="4" height="8" rx="2" stroke="#E3E3E3" strokeWidth="2" />
                <path d="M6 11a6 6 0 0012 0" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 17v3" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
