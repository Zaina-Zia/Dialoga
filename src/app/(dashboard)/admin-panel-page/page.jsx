"use client";
import React, { useEffect, useState } from "react";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import DesktopHeader from "../../../components/dashboard/DesktopHeader";
import { useRouter } from "next/navigation";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";
import { YourTasksSection } from "../../../components/dashboard/YourTasksSection";
import { MessageItem } from "../../../components/dashboard/MessageItem";
import { CategoryCard } from "../../../components/dashboard/CategoryCard";

// Admin Panel page (390x958 artboard). Uses shared Header and Footer.
// Temporary auth gating: if last login email !== admin@example.com OR password empty, redirect to /dashboard.
export default function AdminPanelPage() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    try {
      const email =
        typeof window !== "undefined" &&
        (localStorage.getItem("auth_email") ||
          localStorage.getItem("email") ||
          sessionStorage.getItem("auth_email") ||
          sessionStorage.getItem("email"));
      const pwd =
        typeof window !== "undefined" &&
        (localStorage.getItem("auth_password") ||
          localStorage.getItem("password") ||
          sessionStorage.getItem("auth_password") ||
          sessionStorage.getItem("password"));
      if (email !== "admin@example.com" || !pwd) {
        router.replace("/dashboard");
      }
    } catch (_) {
      router.replace("/dashboard");
    }
  }, [router]);

  const tasks = [
    {
      label: "Mensajes",
      count: 7,
      iconSrc: "/images/Dashboard_Home/mensajes.png",
      iconAlt: "Mensajes",
      desktop: { labelWidth: 58, labelFontSize: 12, labelLineHeight: 18, iconTextGap: 2, textGap: 1 },
    },
    {
      label: "Envío",
      count: 7,
      iconSrc: "/images/Dashboard_Home/envio.png",
      iconAlt: "Envío",
      desktop: { labelWidth: 32, labelFontSize: 12, labelLineHeight: 18, iconTextGap: 2, textGap: 1 },
    },
    {
      label: "Visitas a la tienda",
      count: 7,
      iconSrc: "/images/Dashboard_Home/visitas.png",
      iconAlt: "Visitas",
      desktop: { labelWidth: 93, labelFontSize: 10, labelLineHeight: 15, iconTextGap: 6, textGap: 3 },
    },
  ];
  const messages = [
    { name: "Name of Customer", product: "Name of the product" },
    { name: "Name of Customer", product: "Name of the product" },
    { name: "Name of Customer", product: "Name of the product" },
    { name: "Name of Customer", product: "Name of the product" },
  ];
  const categories = [
    { label: "Interesado", iconSrc: "/images/Dashboard_Home/CustomerCategories/interesado.png", innerW: 66, innerH: 44, textW: 66, textH: 18, gap: 2, labelFontSize: 12, labelLineHeight: 18 },
    { label: "Visitas a la tienda", iconSrc: "/images/Dashboard_Home/visitas.png", innerW: 90, innerH: 45, textW: 90, textH: 15, gap: 6, labelFontSize: 10, labelLineHeight: 15 },
    { label: "Envío", iconSrc: "/images/Dashboard_Home/envio.png", innerW: 38, innerH: 44, textW: 38, textH: 18, gap: 2, labelFontSize: 12, labelLineHeight: 18 },
    { label: "Solo Pide Info", iconSrc: "/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png", innerW: 81, innerH: 44, textW: 81, textH: 18, gap: 1, labelFontSize: 12, labelLineHeight: 18 },
    { label: "No Interesado", iconSrc: "/images/Dashboard_Home/CustomerCategories/noIntersado.png", innerW: 85, innerH: 48, textW: 85, textH: 18, gap: 3, labelFontSize: 12, labelLineHeight: 18 },
    { label: "Closed", iconSrc: "/images/Dashboard_Home/CustomerCategories/closed.png", innerW: 38, innerH: 44, textW: 38, textH: 18, gap: 1, labelFontSize: 12, labelLineHeight: 18 },
  ];

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1] overflow-x-hidden">
      {/* Mobile container */}
      <section className="lg:hidden w-full max-w-[390px] min-h-[958.09px] mx-auto flex flex-col items-center gap-[11px] py-8">
        <div className="w-[390px] flex flex-col">
          <DashboardHeader />
        </div>
        <div className="w-[390px] flex flex-col items-center gap-4 px-3 pb-4">
          <YourTasksSection tasks={tasks} />
          <div className="w-[358px] min-h-[327px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB]">
            <div className="w-full h-full p-3 flex flex-col gap-2">
              <div className="w-[334px] h-[27px] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[18px] leading-[27px] font-medium text-black">Mensajes</span>
                </div>
                <div className="w-[15.5px] h-[15.5px] inline-flex items-center justify-center" aria-hidden>
                  <svg width="15.5" height="15.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="w-[334px] flex flex-col gap-2">
                {messages.map((m, i) => (
                  <MessageItem key={i} name={m.name} product={m.product} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-[358px] min-h-[218px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB]">
            <div className="w-full h-full p-3 flex flex-col gap-[10px]">
              <div className="w-[334px] h-[32px] flex items-center justify-between">
                <div className="w-[230px] h-[32px] text-[21px] leading-[32px] font-semibold text-black">Customer Categories</div>
                <div className="w-5 h-5 inline-flex items-center justify-center" aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="w-[334px] flex flex-wrap justify-between gap-y-[6px]">
                {categories.map((c, i) => (
                  <CategoryCard key={i} iconSrc={c.iconSrc} label={c.label} innerW={c.innerW} innerH={c.innerH} textW={c.textW} textH={c.textH} gap={c.gap} labelFontSize={c.labelFontSize} labelLineHeight={c.labelLineHeight} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
      </section>

      {/* Desktop container */}
      <section className="hidden lg:flex w-full justify-center">
        <div className="w-full max-w-[1512px] flex flex-col gap-8 py-8 px-6 lg:px-10 2xl:px-[55px]">
          <DesktopHeader
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
            showAdminControl
          />
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* Left column: Tasks + Messages */}
            <div className="flex flex-1 min-w-[540px] flex-col gap-6 px-0 lg:px-[10px] items-center lg:items-start">
              <div className="w-full max-w-[680px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] px-3 py-6">
                <div className="flex w-full flex-col gap-[14px]">
                  <h2 className="text-[21px] leading-[32px] font-semibold text-black">Your Tasks</h2>
                  <div
                    className="grid w-full gap-3 lg:grid-cols-3 sm:grid-cols-2"
                    style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05))" }}
                  >
                    {tasks.map((task, idx) => (
                      <div
                        key={idx}
                        className="flex h-[70px] w-full flex-col items-center justify-center rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
                      >
                        <div className="flex flex-col items-center" style={{ gap: `${task.desktop?.iconTextGap ?? 2}px` }}>
                          <img src={task.iconSrc} alt={task.iconAlt} className="h-[24px] w-[24px] object-contain" />
                          <div className="flex flex-col items-center" style={{ gap: `${task.desktop?.textGap ?? 1}px` }}>
                            <span
                              className="font-medium text-black text-center"
                              style={{ width: `${task.desktop?.labelWidth ?? 58}px`, fontSize: `${task.desktop?.labelFontSize ?? 12}px`, lineHeight: `${task.desktop?.labelLineHeight ?? 18}px` }}
                            >
                              {task.label}
                            </span>
                            <span className="font-medium text-black text-center" style={{ fontSize: "12px", lineHeight: "18px" }}>
                              {task.count}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full max-w-[680px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] px-3 py-6">
                <div className="flex w-full flex-col gap-[14px]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[21px] leading-[32px] font-medium text-black">Mensajes</h2>
                    <div className="h-[15.5px] w-[15.5px]" aria-hidden>
                      <svg width="15.5" height="15.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="grid w-full gap-3 sm:grid-cols-2"
                  >
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className="flex h-[61px] w-full items-center gap-4 rounded-[8px] border border-[rgba(70,70,70,0.25)] bg-[#FDFCFB] px-[6px] py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
                      >
                        <div className="grid h-[45px] w-[45px] place-items-center rounded-full" style={{ background: "rgba(9, 181, 88, 0.25)" }}>
                          <img src="/images/Dashboard_Home/accountCircle.png" alt="avatar" className="h-[29px] w-[29px] object-contain" />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[15px] leading-[22px] font-medium text-black">{m.name}</span>
                          <span className="text-[12px] leading-[18px] text-black">{m.product}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Customer Categories */}
            <div className="flex flex-1 min-w-[540px] flex-col gap-6 px-0 lg:px-[10px] items-center lg:items-start">
              <div className="w-full max-w-[680px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] px-3 py-6">
                <div className="flex w-full flex-col gap-[14px]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[21px] leading-[32px] font-semibold text-black">Customer Categories</h2>
                    <div className="h-5 w-5" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="grid w-full gap-3 lg:grid-cols-3 sm:grid-cols-2"
                  >
                    {categories.map((c, i) => (
                      <div
                        key={i}
                        className="flex h-[70px] w-full flex-col items-center justify-center rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
                      >
                        <div className="flex flex-col items-center" style={{ gap: `${c.gap}px` }}>
                          <img src={c.iconSrc} alt={c.label} className="h-[24px] w-[24px] object-contain" />
                          <div
                            className="font-medium text-black text-center"
                            style={{ width: `${c.textW}px`, height: `${c.textH}px`, fontSize: `${c.labelFontSize}px`, lineHeight: `${c.labelLineHeight}px` }}
                          >
                            {c.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Overlays */}
          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
        </div>
      </section>
    </main>
  );
}
