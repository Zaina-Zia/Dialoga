"use client";
import React from "react";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import Footer from "../../../components/layout/Footer";

export default function NotificationPage() {
  const items = [
    { title: "Title of notification", time: "15:45, Sep 05, 2025" },
    { title: "Title of notification", time: "15:45, Sep 05, 2025" },
    { title: "Title of notification", time: "15:45, Sep 05, 2025" },
    { title: "Title of notification", time: "15:45, Sep 05, 2025" },
  ];

  return (
    <main className="min-h-dvh w-full grid place-items-center bg-[#F5F3F1]">
      {/* Frame 31: artboard 390x844 with small vertical gaps */}
      <section className="w-full max-w-[390px] min-h-[844px] flex flex-col items-center gap-[14px] py-8">
        {/* Header */}
        <div className="w-[390px] flex flex-col">
          <DashboardHeader />
        </div>

        {/* Content block per Figma (px-12 outer, card 366x307) */}
        <div className="w-[390px] px-3 grid place-items-center">
          <div className="w-[366px] min-h-[307px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] py-3">
            {/* Title row */}
            <div className="px-[12px]">
              <h2 className="w-full text-[21px] leading-[32px] font-semibold text-black">Notifications</h2>
            </div>

            {/* List area */}
            <div className="mt-2 px-[12px] flex flex-col gap-4">
              {items.map((it, i) => (
                <button key={i} type="button" className="w-full h-[52px] rounded-[8px] border border-[#464646]/25 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#FDFCFB] px-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Leading icon */}
                    <div className="h-[32px] w-[32px] rounded-full grid place-items-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13h10M7 9h10M7 17h6" stroke="#09B558" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
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
                  {/* Chevron */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6l6 6-6 6" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-[390px] mt-auto">
          <Footer onNotify={() => {}} onLogout={() => {}} />
        </div>
      </section>
    </main>
  );
}
