"use client";
import React, { useState } from "react";
import ChatViewHeader from "../../../components/chat/ChatViewHeader";
import ChatViewFooter from "../../../components/chat/ChatViewFooter";

export default function ChatViewPage() {
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleAddImage = () => {
    setAttachments((prev) => [...prev, "Image"]);
  };

  const handleRecord = () => {
    setAttachments((prev) => [...prev, "Voice"]);
  };

  return (
    <main className="w-full h-screen max-h-screen flex justify-center bg-[#F5F3F1]">
      <section
        className="w-full max-w-[390px] h-full flex flex-col pt-8 px-4 sm:px-5 bg-[#F5F3F1]"
      >
        {/* Header */}
        <ChatViewHeader />

        {/* Scrollable message area */}
        <div className="flex-1 min-h-0 flex flex-col items-center gap-[16px] py-4 overflow-y-auto">
          <div className="flex flex-col items-center gap-[16px] w-[280px]">
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
            <div className="w-full flex flex-col items-center gap-1 mb-2">
              {attachments.map((a, i) => (
                <div key={i} className="text-sm text-[#464646]">
                  Added: {a}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fixed message input bar at bottom */}
        <div className="flex-none pb-4">
          <ChatViewFooter
            onPlus={handleAddImage}
            onAttach={handleAddImage}
            onSend={handleRecord}
          />
        </div>
      </section>
    </main>
  );
}
