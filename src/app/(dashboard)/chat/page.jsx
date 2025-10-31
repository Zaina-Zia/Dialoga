"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import Footer from "../../../components/layout/Footer";
import { Search, Plus } from "lucide-react";

export default function ChatListPage() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = React.useState(false);
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
                <div key={idx} className="w-[334px] h-[45px] bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)] rounded-[8px] px-[10px] flex items-center gap-[10px]">
                  {/* Avatar 45x45 with green ring */}
                  <div className="h-[45px] w-[45px] rounded-full border-2 border-[rgba(9,181,88,0.25)] grid place-items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="4" stroke="#09B558" strokeWidth="1.5" />
                      <path d="M4 20c2-4 6-4 8-4s6 0 8 4" stroke="#09B558" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  {/* Message text */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="w-full flex items-start justify-between gap-[9px]">
                      <span className="text-[15px] leading-[22px] font-medium text-black">{m.name}</span>
                      <span className="text-[10px] leading-[15px] text-black/50">{m.time}</span>
                    </div>
                    <div className="text-[10px] leading-[15px] text-black/50">{m.preview}</div>
                  </div>
                </div>
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

        {/* Footer pinned near bottom */}
        <div className="w-[390px] mt-auto">
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => router.push("/login")} />
        </div>
      </section>
    </main>
  );
}

// Inline notification modal overlay
function NotificationOverlay({ open, onClose }) {
  if (!open) return null;
  const items = [
    { title: "Title of notification", time: "15:45, Sep 05, 2025" },
    { title: "Title of notification", time: "15:45, Sep 05, 2025" },
    { title: "Title of notification", time: "15:45, Sep 05, 2025" },
    { title: "Title of notification", time: "15:45, Sep 05, 2025" },
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center px-4">
      <div className="relative w-full max-w-[334px] rounded-[8px] bg-[#FDFCFB] border border-[#E4E1DD] p-4 shadow-md">
        <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 h-6 w-6 grid place-items-center text-black/70">✕</button>
        <h2 className="text-[21px] leading-[25px] font-semibold text-black mb-2">Notifications</h2>
        <div className="flex flex-col divide-y divide-[#E4E1DD]">
          {items.map((it, i) => (
            <button key={i} type="button" className="w-full py-3 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="h-[28px] w-[28px] grid place-items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13h10M7 9h10M7 17h6" stroke="#09B558" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] leading-[22px] font-medium text-black">{it.title}</span>
                  <div className="flex items-center gap-1 text-[10px] leading-[15px] text-black/50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" stroke="#464646" strokeWidth="1.5" />
                      <path d="M12 7v6l4 2" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{it.time}</span>
                  </div>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6l6 6-6 6" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
