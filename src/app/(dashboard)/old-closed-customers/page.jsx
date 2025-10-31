"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import Footer from "../../../components/layout/Footer";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";
import { ChevronDown, ChevronUp } from "lucide-react";

// Old/Closed Customers page (390x844 artboard). Uses shared Header and Footer.
// Icons: lucide-react. Accordion: smooth toggle with chevron down (closed) -> up (open).
export default function OldClosedCustomersPage() {
  const router = useRouter();
  const initial = {
    interesado: false,
    delivery: false,
    vaEnPersona: false,
    soloPideInfo: false,
    noInteresado: false,
    closed: false,
  };
  const [open, setOpen] = useState(initial);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const categories = [
    { key: "interesado", title: "Interesado", imageSrc: "/images/Dashboard_Home/CustomerCategories/interesado.png" },
    { key: "delivery", title: "Delivery", imageSrc: "/images/Dashboard_Home/envio.png" },
    { key: "vaEnPersona", title: "Va En Persona", imageSrc: "/images/Dashboard_Home/visitas.png" },
    { key: "soloPideInfo", title: "Solo Pide Info", imageSrc: "/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png" },
    { key: "noInteresado", title: "No Interesado", imageSrc: "/images/Dashboard_Home/CustomerCategories/noIntersado.png" },
    { key: "closed", title: "Closed", imageSrc: "/images/Dashboard_Home/CustomerCategories/closed.png" },
  ];

  return (
    <main className="min-h-dvh w-full grid place-items-center bg-[#F5F3F1]">
      {/* Frame 23: 390 width, 844 height, padding-y:32, gap:48 */}
      <section className="w-full max-w-[390px] min-h-[844px] flex flex-col items-center gap-12 py-8">
        {/* Header (shared, no back like dashboard) */}
        <div className="w-[390px] flex flex-col">
          <DashboardHeader hideBack />
        </div>

        {/* Content block (centered) */}
        <div className="w-[390px] flex flex-col items-center gap-4">
          {/* Card 366x307, border, 12px vertical padding, rounded */}
          <div className="w-[366px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] py-3">
            {/* Title row: px-12, 21/25 */}
            <div className="px-[12px]">
              <h2 className="text-[21px] leading-[25px] font-semibold text-black">Old/Closed Customers</h2>
            </div>

            {/* List area: px-12, gap-4 */}
            <div className="px-[12px] pt-2 pb-3 space-y-4">
              {categories.map(({ key, title, imageSrc }) => {
                const isOpen = open[key];
                return (
                  <div key={key} className="w-full">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-6 w-6 grid place-items-center rounded text-emerald-600">
                          <img src={imageSrc} alt="" className="h-5 w-5 object-contain" />
                        </span>
                        <span className="text-[18px] leading-[27px] font-medium text-black">{title}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-black/85 transition-transform" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-black/85 transition-transform" />
                      )}
                    </button>
                    <div className={`overflow-hidden transition-all ${isOpen ? "max-h-40 pt-2" : "max-h-0"}`}>
                      <ul className="list-disc pl-5 text-sm text-neutral-700">
                        <li>Example detail 1</li>
                        <li>Example detail 2</li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notifications overlay */}
        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />

        {/* Logout overlay */}
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push('/login')} />

        {/* Footer (shared) */}
        <div className="w-[390px] mt-auto">
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
        </div>
      </section>
    </main>
  );
}

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
