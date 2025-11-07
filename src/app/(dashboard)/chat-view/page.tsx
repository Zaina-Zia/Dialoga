"use client";
import React from "react";
import DesktopHeader from "../../../components/dashboard/DesktopHeader";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import Footer from "../../../components/layout/Footer";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";

export default function ChatDesktopPage() {
  const contacts = [
    { name: "Name of Customer", time: "13:45", preview: "Abbriviated message here" },
    { name: "Name of Customer", time: "Yesterday", preview: "Abbriviated message here" },
    { name: "Name of Customer", time: "Sep 28", preview: "Abbriviated message here" },
    { name: "Name of Customer", time: "Sep 27", preview: "Abbriviated message here" },
    { name: "Name of Customer", time: "Sep 27", preview: "Abbriviated message here" },
  ];

  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  return (
    <>
      {/* Desktop layout */}
      <main className="hidden lg:flex w-full justify-center bg-[#F5F3F1] overflow-x-hidden">
        <section className="w-full max-w-[1512px] min-h-[982px] flex flex-col pt-8">
          <DesktopHeader onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
          <div className="w-full mt-0 border border-black bg-[#FBF9F7] flex" style={{height: "848.79px"}}>
          <aside className="w-[382px] h-full bg-[#F5F3F1] flex flex-col">
            <div className="flex-1 border border-[#E4E1DD] bg-[#FBF9F7] px-3 pt-6 pb-3 flex flex-col gap-3">
              <div className="px-4 flex items-center justify-between">
                <div className="h-[45px] w-[45px] rounded-full grid place-items-center text-white bg-[#09B558]" aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>
              <div className="w-full h-6 rounded-[10px] bg-[#D9D9D9] px-[10px] grid grid-cols-[24px_1fr] items-center gap-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="#464646" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="#464646" strokeWidth="2" strokeLinecap="round"/></svg>
                <span className="text-[15px] leading-[22px] text-[#464646]">Search</span>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                {contacts.map((c, i) => (
                  <button key={i} type="button" className="w-full h-[45px] bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)] px-0 pr-[10px] flex items-center gap-[10px]">
                    <div className="h-[45px] w-[45px] grid place-items-center">
                      <div className="h-[36px] w-[36px] rounded-full" style={{background: "rgba(9,181,88,0.25)"}} />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-[9px]">
                        <span className="text-[15px] leading-[22px] font-medium text-black">{c.name}</span>
                        <span className="text-[10px] leading-[15px] text-black/50 min-w-[34px] text-right">{c.time}</span>
                      </div>
                      <div className="flex items-center gap-[2px] text-[10px] leading-[15px] text-black/50">
                        <span>{c.preview}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="flex-1 h-full bg-[#FDFCFB] flex flex-col items-center">
            <div className="w-[1130px] flex flex-col items-center gap-6 pt-6">
              <div className="w-[242px] h-[45px] flex items-center gap-2">
                <div className="h-[45px] w-[45px] grid place-items-center">
                  <div className="h-[36px] w-[36px] rounded-full" style={{background: "rgba(9,181,88,0.25)"}} />
                </div>
                <div className="text-[21px] leading-[25px] font-semibold text-black">Name of Customer</div>
              </div>
              <div className="w-[1130px] flex flex-col justify-between" style={{height: "755.79px"}}>
                <div className="mx-auto w-[280px] h-[134px] flex flex-col items-center gap-4">
                  <div className="h-[23px] rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#D9D9D9] px-[43px] grid place-items-center">
                    <span className="text-[15px] leading-[22px] text-[#464646]">Today</span>
                  </div>
                  <div className="relative h-[95px] w-[280px]">
                    <div className="absolute inset-0 rounded-[8px] bg-[#D9D9D9]" />
                    <div className="absolute left-[9px] right-[9px] top-[16px] text-[15px] leading-[22px] text-[#464646] text-center">
                      Esta persona está interesada en mesa de madera
                    </div>
                  </div>
                </div>
                <div className="w-full h-[56px] bg-[#464646] flex items-end justify-center gap-2 px-4 py-4">
                  <div className="h-6 w-6 grid place-items-center" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  <div className="flex-1 max-w-[1002px] h-6 bg-[#D9D9D9] rounded-[10px]" />
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 grid place-items-center" aria-hidden>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="7" width="14" height="10" rx="2" stroke="#E3E3E3" strokeWidth="2"/><path d="M5 9l7 5 7-5" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                    <div className="h-6 w-6 grid place-items-center" aria-hidden>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => (window.location.href = "/login")} />
        </section>
      </main>

      {/* Mobile layout */}
      <main className="lg:hidden min-h-dvh w-full grid place-items-center bg-[#F5F3F1]">
        <section className="w-full max-w-[390px] min-h-[844px] flex flex-col items-center gap-[12px] py-8">
          {/* Header */}
          <div className="w-[390px]">
            <DashboardHeader />
          </div>

          {/* Content area */}
          <div className="w-[390px] px-3">
            <div className="w-[366px] min-h-[640px] mx-auto bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] p-3 flex flex-col justify-between">
              {/* Messages area */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="h-[23px] rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#D9D9D9] px-[20px] grid place-items-center">
                  <span className="text-[12px] leading-[18px] text-[#464646]">Today</span>
                </div>
                <div className="relative w-[280px] h-[95px]">
                  <div className="absolute inset-0 rounded-[8px] bg-[#D9D9D9]" />
                  <div className="absolute left-[9px] right-[9px] top-[16px] text-[12px] leading-[18px] text-[#464646] text-center">
                    Esta persona está interesada en mesa de madera
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="w-full h-[56px] bg-[#464646] flex items-center gap-2 px-3">
                <div className="h-6 w-6 grid place-items-center" aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div className="flex-1 h-6 bg-[#D9D9D9] rounded-[10px]" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 grid place-items-center" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="7" width="14" height="10" rx="2" stroke="#E3E3E3" strokeWidth="2"/><path d="M5 9l7 5 7-5" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  <div className="h-6 w-6 grid place-items-center" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-[390px] mt-auto">
            <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
          </div>
        </section>
      </main>
    </>
  );
}
