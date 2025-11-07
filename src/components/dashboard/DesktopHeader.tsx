"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Bell, LogOut, ChevronLeft } from "lucide-react";

// DesktopHeader: shared desktop-only header with centered logo, back chevron, actions, and full-bleed divider
export default function DesktopHeader({ onNotify, onLogout }: { onNotify?: () => void; onLogout?: () => void }) {
  const router = useRouter();
  return (
    <header className="hidden lg:flex w-full flex-col">
      <div className="w-full flex items-center justify-between p-4">
        <button aria-label="Go back" onClick={() => router.back()} className="grid place-items-center h-5 w-5">
          <ChevronLeft className="h-5 w-5 text-black/85" />
        </button>
        <div className="h-[65px] w-[232px] grid place-items-center">
          <img src="/images/Logo_bg_removed.png" alt="Dialoga" className="h-[65px] w-[232px] object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Notifications" onClick={onNotify} className="grid place-items-center h-7 w-7">
            <Bell className="h-7 w-7 text-[#464646]" />
          </button>
          <button aria-label="Logout" onClick={onLogout} className="grid place-items-center h-7 w-7">
            <LogOut className="h-7 w-7 text-[#464646]" />
          </button>
        </div>
      </div>
      {/* Full-bleed divider */}
      <div className="w-screen border-t border-black" />
    </header>
  );
}
