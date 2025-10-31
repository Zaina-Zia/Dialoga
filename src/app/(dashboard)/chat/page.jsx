"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import Footer from "../../../components/layout/Footer";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";
import { Search, Plus } from "lucide-react";

export default function ChatListPage() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const messages = [
    { name: "Name of Customer", preview: "Abbreviated message here", time: "13:45" },
    { name: "Name of Customer", preview: "Abbreviated message here", time: "Yesterday" },
    { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 28" },
    { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 27" },
    { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 27" },
  ];

  return (
    <main className="min-h-dvh w-full grid place-items-center bg-[#F5F3F1]">
      {/* Frame 27: artboard 390x844 with small gap below header (≈12px) */}
      <section className="w-full max-w-[390px] min-h-[844px] flex flex-col items-center gap-[12px] py-8">
        {/* Header */}
        <div className="w-[390px] flex flex-col">
          <DashboardHeader />
        </div>

        {/* Content area: 390 wide, px-4 (16px) just below header */}
        <div className="w-[390px] px-4">
          {/* Card: 358x405, padding 12, gap 11, border and radius */}
          <div className="relative w-[358px] min-h-[405px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] p-3 mx-auto flex flex-col gap-[11px]">
            {/* Title row */}
            <div className="w-[334px] h-[25px] flex items-center">
              <h2 className="text-[21px] leading-[25px] font-semibold text-black">Mensajes</h2>
            </div>

            {/* Search bar */}
            <div className="w-[334px] h-[24px] bg-[#D9D9D9] rounded-[10px] px-[10px] flex items-center gap-[10px]">
              <Search className="h-5 w-5 text-[#464646]" />
              <span className="text-[15px] leading-[22px] font-normal text-[#464646]">Search</span>
            </div>

            {/* Messages list */}
            <div className="w-[334px] flex flex-col gap-2">
              {messages.map((m, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => router.push("/chat-view")}
                  className="w-[334px] h-[45px] bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)] rounded-[8px] px-[10px] flex items-center gap-[10px] active:opacity-90"
                >
                  {/* Avatar 45x45 with green ring (same asset as dashboard) */}
                  <div className="h-[45px] w-[45px] rounded-full border-2 border-[rgba(9,181,88,0.25)] overflow-hidden grid place-items-center">
                    <img src="/images/Dashboard_Home/accountCircle.png" alt="avatar" className="h-[41px] w-[41px] object-contain" />
                  </div>
                  {/* Message text */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="w-full flex items-start justify-between gap-[9px]">
                      <span className="text-[15px] leading-[22px] font-medium text-black">{m.name}</span>
                      <span className="text-[10px] leading-[15px] text-black/50">{m.time}</span>
                    </div>
                    <div className="text-[10px] leading-[15px] text-black/50">{m.preview}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Floating add button bottom-right of card */}
            <button type="button" aria-label="New chat" className="absolute right-3 bottom-3 h-10 w-10 rounded-full bg-white border-2 border-[#09B558] grid place-items-center shadow">
              <Plus className="h-5 w-5 text-[#09B558]" />
            </button>
          </div>
        </div>

        {/* Notifications overlay */}
        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />

        {/* Logout overlay */}
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />

        {/* Footer pinned near bottom */}
        <div className="w-[390px] mt-auto">
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
        </div>
      </section>
    </main>
  );
}
