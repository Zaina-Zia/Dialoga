"use client";
import React from "react";
import { X } from "lucide-react";

export type LogoutOverlayProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

// Reusable Logout overlay with outer and inner rectangles per Figma
export const LogoutOverlay: React.FC<LogoutOverlayProps> = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center px-4">
      {/* Outer rectangle (more rectangular corners) */}
      <div className="relative w-full max-w-[334px] rounded-[8px] bg-white p-3 shadow-[0_6px_8px_rgba(0,0,0,0.12)]">
        {/* Inner rectangle */}
        <div className="relative rounded-[8px] bg-[#FDFCFB] border border-[#E4E1DD] p-4">
          <button aria-label="Close" onClick={onClose} className="absolute right-3 top-2 h-6 w-6 grid place-items-center text-black/70">
            <X className="h-5 w-5" />
          </button>
          <div className="mt-4 mb-4 text-center">
            <p className="text-[18px] leading-[27px] font-semibold text-black">Are you sure you want to log out?</p>
          </div>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full h-[45px] rounded-[8px] bg-[#09B558] text-white text-[18px] font-semibold leading-[27px] grid place-items-center shadow-[0_4px_4px_rgba(0,0,0,0.05)] active:scale-[0.99]"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
