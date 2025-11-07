"use client";
import React from "react";
import Link from "next/link";
import { MessageSquare, Truck, Store, HeartHandshake, Frown, History, ChevronRight } from "lucide-react";
import DesktopHeader from "../../components/dashboard/DesktopHeader";
import { NotificationOverlay } from "../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../components/overlays/LogoutOverlay";

// DashboardDesktop: Desktop-only layout (>=1280px). Mobile keeps existing page.
// Uses Tailwind utilities approximating the Figma spacing (gap-8, p-6, etc.).
// Main responsive logic: hidden on smaller screens, flex grid on lg+.

const TaskCard: React.FC<{ label: string; icon?: React.ReactNode; imgSrc?: string; count?: number }>
= ({ label, icon, imgSrc, count }) => (
  <div className="relative h-[70px] w-[200px] rounded-[8px] border border-[rgba(3,18,31,0.2)] bg-[#FDFCFB] grid place-items-center shadow-sm">
    <div className="flex flex-col items-center gap-0.5">
      <div className="h-[24px] w-[24px] text-emerald-600 grid place-items-center">
        {imgSrc ? (
          <img src={imgSrc} alt="icon" className="h-[24px] w-[24px] object-contain" />
        ) : (
          icon
        )}
      </div>
      <div className="text-[12px] leading-[18px] font-medium text-black text-center">{label}</div>
      {typeof count === "number" && (
        <div className="text-[12px] leading-[18px] font-medium text-black">{count}</div>
      )}
    </div>
  </div>
);

const MessagesPanel: React.FC = () => (
  <section className="rounded-[8px] border border-[#E4E1DD] bg-[#FBF9F7] py-6 px-3 w-full">
    <div className="flex items-center justify-between w-full">
      <h2 className="text-[21px] leading-[32px] font-medium text-black">Mensajes</h2>
      <Link href="/chat" aria-label="Open Mensajes" className="grid place-items-center h-6 w-6">
        <ChevronRight className="h-5 w-5 text-black/85" />
      </Link>
    </div>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {[0,1,2,3].map((i) => (
        <div key={i} className="flex items-center gap-4 rounded-[8px] border border-[rgba(70,70,70,0.25)] bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)] py-2 px-2 min-h-[61px]">
          <div className="h-[45px] w-[45px] rounded-full grid place-items-center" style={{ background: "rgba(9, 181, 88, 0.25)" }}>
            <img src="/images/Dashboard_Home/accountCircle.png" alt="avatar" className="h-[41px] w-[41px] object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="text-[15px] leading-[22px] font-medium text-black">Name of Customer</div>
            <div className="text-[12px] leading-[18px] text-black">Name of the product</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const CustomerCategoriesPanel: React.FC = () => (
  <section className="rounded-[8px] border border-[#E4E1DD] bg-[#FBF9F7] py-6 px-3 w-full">
    <div className="flex items-center justify-between w-full">
      <h2 className="text-[21px] leading-[32px] font-semibold text-black">Customer Categories</h2>
      <Link href="/customer-categories" aria-label="Open Customer Categories" className="grid place-items-center h-6 w-6">
        <ChevronRight className="h-5 w-5 text-black/85" />
      </Link>
    </div>
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {/* Row 1 */}
      <TaskCard label="Interesado" imgSrc="/images/Dashboard_Home/CustomerCategories/interesado.png" />
      <TaskCard label="Visitas a la tienda" imgSrc="/images/Dashboard_Home/visitas.png" />
      <TaskCard label="Envío" imgSrc="/images/Dashboard_Home/envio.png" />
      {/* Row 2 */}
      <TaskCard label="Solo Pide Info" imgSrc="/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png" />
      <TaskCard label="No Interesado" imgSrc="/images/Dashboard_Home/CustomerCategories/noIntersado.png" />
      <TaskCard label="Closed" imgSrc="/images/Dashboard_Home/CustomerCategories/closed.png" />
    </div>
  </section>
);

// Footer intentionally removed per request

export default function DashboardDesktop() {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  return (
    <main className="hidden lg:flex w-full justify-center bg-[#F5F3F1] overflow-x-hidden">
      <section className="w-full max-w-[1512px] flex flex-col items-stretch py-8 gap-8 px-4 sm:px-6 lg:px-10 xl:px-14">
        <DesktopHeader onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />

        {/* Main content row: left (tasks + messages), right (categories) */}
        <div className="w-full flex flex-col xl:flex-row items-start justify-between gap-6">
          {/* Left column */}
          <div className="flex min-w-0 flex-1 flex-col gap-6 px-[10px]">
            {/* Your Tasks */}
            <section className="rounded-[8px] border border-[#E4E1DD] bg-[#FBF9F7] py-6 px-3 w-full">
              <div className="w-full">
                <h2 className="text-[21px] leading-[32px] font-semibold text-black">Your Tasks</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <TaskCard label="Mensajes" imgSrc="/images/Dashboard_Home/mensajes.png" count={7} />
                <TaskCard label="Envío" imgSrc="/images/Dashboard_Home/envio.png" count={7} />
                <TaskCard label="Visitas a la tienda" imgSrc="/images/Dashboard_Home/visitas.png" count={7} />
              </div>
            </section>

            {/* Messages */}
            <MessagesPanel />
          </div>

          {/* Right column */}
          <div className="flex min-w-0 flex-1 flex-col gap-6 px-[10px]">
            <CustomerCategoriesPanel />
          </div>
        </div>

        {/* Overlays */}
        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => (window.location.href = "/login")} />
      </section>
    </main>
  );
}
