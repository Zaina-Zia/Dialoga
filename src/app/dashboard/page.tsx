"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { TaskStatCard } from "../../components/dashboard/TaskStatCard";
import { MessageItem } from "../../components/dashboard/MessageItem";
import { CategoryCard } from "../../components/dashboard/CategoryCard";
import { YourTasksSection } from "../../components/dashboard/YourTasksSection";
import Footer from "../../components/layout/Footer";
import { LogoutOverlay } from "../../components/overlays/LogoutOverlay";
import { NotificationOverlay } from "../../components/notifications/NotificationOverlay";
import DashboardDesktop from "./DashboardDesktop";

export default function DashboardHomePage() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const logout = () => {
    router.push("/login");
  };
  const tasks = [
    { label: "Mensajes", count: 7, iconSrc: "/images/Dashboard_Home/mensajes.png", iconAlt: "Mensajes" },
    { label: "Envío", count: 7, iconSrc: "/images/Dashboard_Home/envio.png", iconAlt: "Envío" },
    { label: "Visitas a la tienda", count: 7, iconSrc: "/images/Dashboard_Home/visitas.png", iconAlt: "Visitas" },
  ];

  const categories = [
    // Top row
    { label: "Interesado", iconSrc: "/images/Dashboard_Home/CustomerCategories/interesado.png", innerW: 66, innerH: 44, textW: 66, textH: 18, gap: 2, labelFontSize: 12, labelLineHeight: 18 },
    { label: "Visitas a la tienda", iconSrc: "/images/Dashboard_Home/visitas.png", innerW: 90, innerH: 45, textW: 90, textH: 15, gap: 6, labelFontSize: 10, labelLineHeight: 15 },
    { label: "Envío", iconSrc: "/images/Dashboard_Home/envio.png", innerW: 38, innerH: 44, textW: 38, textH: 18, gap: 2, labelFontSize: 12, labelLineHeight: 18 },
    // Bottom row
    { label: "Solo Pide Info", iconSrc: "/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png", innerW: 81, innerH: 44, textW: 81, textH: 18, gap: 1, labelFontSize: 12, labelLineHeight: 18 },
    { label: "No Interesado", iconSrc: "/images/Dashboard_Home/CustomerCategories/noIntersado.png", innerW: 85, innerH: 48, textW: 85, textH: 18, gap: 3, labelFontSize: 12, labelLineHeight: 18 },
    { label: "Closed", iconSrc: "/images/Dashboard_Home/CustomerCategories/closed.png", innerW: 38, innerH: 44, textW: 38, textH: 18, gap: 1, labelFontSize: 12, labelLineHeight: 18 },
  ];

  const messages = [
    { name: "Name of Customer", product: "Name of the product" },
    { name: "Name of Customer", product: "Name of the product" },
    { name: "Name of Customer", product: "Name of the product" },
    { name: "Name of Customer", product: "Name of the product" },
  ];

  return (
    <>
      {/* Desktop layout (lg and up) */}
      <DashboardDesktop />

      {/* Mobile layout (hidden on lg and up) */}
      <main className="lg:hidden min-h-dvh w-full grid place-items-center">
      {/* Mobile artboard 390x958 */}
      <section className="w-full max-w-[390px] min-h-dvh flex flex-col items-center bg-[#F5F3F1] pt-8 pb-8 gap-[50px]">
        {/* Frame 35 */}
        <div className="w-[390px] flex flex-col gap-4">
          {/* Header + divider */}
          <DashboardHeader />

          {/* Content area px-3 gap-4 */}
          <div className="w-[390px] px-3 flex flex-col items-center gap-4">
            {/* Your Tasks card */}
            <YourTasksSection tasks={tasks} />

            {/* Mensajes list */}
            <div className="w-[358px] h-[327px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px]">
              <div className="w-full h-full p-3 flex flex-col gap-2">
                <Link href="/chat" className="w-[334px] h-[27px] flex items-center justify-between active:opacity-90" aria-label="Ir a Chat">
                  <div className="flex items-center gap-1">
                    <span className="text-[18px] leading-[27px] font-medium text-black">Mensajes</span>
                  </div>
                  <div className="w-[15.5px] h-[15.5px] inline-flex items-center justify-center" aria-hidden>
                    <svg width="15.5" height="15.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
                <div className="w-[334px] flex flex-col gap-2">
                  {messages.map((m, i) => (
                    <MessageItem key={i} name={m.name} product={m.product} />
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Categories card (outer shell) */}
            <div className="w-[358px] h-[218px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px]">
              <div className="w-full h-full p-3 flex flex-col gap-[10px]">
                <Link href="/customer-categories" className="w-[334px] h-[32px] flex items-center justify-between active:opacity-90" aria-label="Ir a Customer Categories">
                  <div className="w-[230px] h-[32px] text-[21px] leading-[32px] font-semibold text-black">Customer Categories</div>
                  <div className="w-5 h-5 inline-flex items-center justify-center" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
                <div className="w-[334px] flex flex-wrap justify-between gap-y-[6px]">
                  {categories.map((c, i) => {
                    const card = (
                      <CategoryCard
                        key={i}
                        iconSrc={c.iconSrc}
                        label={c.label}
                        innerW={c.innerW}
                        innerH={c.innerH}
                        textW={c.textW}
                        textH={c.textH}
                        gap={c.gap}
                        labelFontSize={c.labelFontSize}
                        labelLineHeight={c.labelLineHeight}
                      />
                    );
                    if (c.label === "Closed") {
                      return (
                        <Link key={i} href="/old-closed-customers" aria-label="See Closed Customers" className="active:scale-[0.99] transition">
                          {card}
                        </Link>
                      );
                    }
                    return card;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications overlay */}
          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />

          {/* Logout overlay */}
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />

          {/* Footer */}
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
        </div>
      </section>
      </main>
    </>
  );
}
