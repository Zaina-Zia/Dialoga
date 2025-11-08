"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Bell, LogOut, ChevronLeft } from "lucide-react";

type DesktopHeaderProps = {
  onNotify?: () => void;
  onLogout?: () => void;
  showAdminControl?: boolean;
};

// DesktopHeader: zoom-stable, centered logo with left/right controls and full-bleed divider
export default function DesktopHeader({ onNotify, onLogout, showAdminControl = false }: DesktopHeaderProps) {
  const router = useRouter();
  return (
    <header className="hidden lg:flex w-full flex-col items-center">
      <div className="w-full flex justify-center">
        <div className="w-[1512px] flex flex-col">
          <div className="flex w-full items-center justify-between px-4 py-3">
            {/* Left: back */}
            <div className="flex items-center">
              <button aria-label="Go back" onClick={() => router.back()} className="grid place-items-center h-6 w-6">
                <ChevronLeft className="h-6 w-6 text-black/85" />
              </button>
            </div>

            {/* Center: logo */}
            <div className="h-[65px] w-[232px] grid place-items-center">
              <img src="/images/Logo_bg_removed.png" alt="Dialoga" className="h-[65px] w-[232px] object-contain" />
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2">
              {showAdminControl && (
                <div className="grid place-items-center h-7 w-7 text-neutral-700" aria-hidden>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-[28px] w-[28px]"
                  >
                    <path d="M10 15H6a4 4 0 0 0-4 4v2"></path>
                    <path d="m14.305 16.53.923-.382"></path>
                    <path d="m15.228 13.852-.923-.383"></path>
                    <path d="m16.852 12.228-.383-.923"></path>
                    <path d="m16.852 17.772-.383.924"></path>
                    <path d="m19.148 12.228.383-.923"></path>
                    <path d="m19.53 18.696-.382-.924"></path>
                    <path d="m20.772 13.852.924-.383"></path>
                    <path d="m20.772 16.148.924.383"></path>
                    <circle cx="18" cy="15" r="3"></circle>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
              <button aria-label="Notifications" onClick={onNotify} className="grid place-items-center h-7 w-7">
                <Bell className="h-7 w-7 text-[#464646]" />
              </button>
              <button aria-label="Logout" onClick={onLogout} className="grid place-items-center h-7 w-7">
                <LogOut className="h-7 w-7 text-[#464646]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen border-t border-black" />
    </header>
  );
}
