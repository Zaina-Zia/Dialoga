"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, LogOut, MessageSquare, Truck, Store } from "lucide-react";

// DashboardDesktop: Desktop-only layout (>=1280px). Mobile keeps existing page.
// Uses Tailwind utilities approximating the Figma spacing (gap-8, p-6, etc.).
// Main responsive logic: hidden on smaller screens, flex grid on lg+.

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="hidden lg:flex w-full flex-col">
      {/* Top bar per Figma: back chevron, centered logo, right actions */}
      <div className="w-full flex items-center justify-between p-4 lg:p-4">
        {/* No back button on dashboard desktop */}
        <div className="h-5 w-5" />
        {/* Logo placeholder (232x65) */}
        <div className="h-[65px] w-[232px] grid place-items-center">
          <img src="/images/Logo_bg_removed.png" alt="Dialoga" className="h-[65px] w-[232px] object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-7 w-7 text-[#464646]" />
          <LogOut className="h-7 w-7 text-[#464646]" />
        </div>
      </div>
      {/* Divider */}
      <div className="w-full border-t border-black" />
    </header>
  );
};

const TaskCard: React.FC<{ label: string; icon: React.ReactNode; count: number }>
= ({ label, icon, count }) => (
  <div className="relative h-[70px] w-[200px] rounded-[8px] border border-[rgba(3,18,31,0.2)] bg-[#FDFCFB] grid place-items-center shadow-sm">
    <div className="flex flex-col items-center gap-0.5">
      <div className="h-[24px] w-[24px] text-emerald-600">{icon}</div>
      <div className="text-[12px] leading-[18px] font-medium text-black text-center">{label}</div>
      <div className="text-[12px] leading-[18px] font-medium text-black">{count}</div>
    </div>
  </div>
);

const MessagesPanel: React.FC = () => (
  <section className="rounded-[8px] border border-[#E4E1DD] bg-[#FBF9F7] p-6 flex-1 min-h-[362px]">
    <div className="flex items-center justify-between">
      <h2 className="text-[21px] leading-[32px] font-medium text-black">Mensajes</h2>
      <Link href="/chat" className="text-sm text-[#464646] underline">View all</Link>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      {[0,1,2,3].map((i) => (
        <div key={i} className="flex items-center gap-4 rounded-[8px] border border-[rgba(70,70,70,0.25)] bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)] p-2">
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
  <section className="rounded-[8px] border border-[#E4E1DD] bg-[#FBF9F7] p-6 min-h-[240px]">
    <div className="flex items-center justify-between">
      <h2 className="text-[21px] leading-[32px] font-semibold text-black">Customer Categories</h2>
      <Link href="/customer-categories" className="text-sm text-[#464646] underline">Manage</Link>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-3">
      <TaskCard label="Mensajes" icon={<MessageSquare className="h-5 w-5" />} count={7} />
      <TaskCard label="Envío" icon={<Truck className="h-5 w-5" />} count={7} />
      <TaskCard label="Visitas a la tienda" icon={<Store className="h-5 w-5" />} count={7} />
    </div>
  </section>
);

// No footer on desktop per updated Figma notes

export default function DashboardDesktop() {
  return (
    <main className="hidden lg:grid min-h-screen w-full place-items-center bg-[#F5F3F1]">
      <section className="w-full max-w-[1512px] flex flex-col gap-8">
        <Header />

        {/* Main content row: left (tasks + messages), right (categories) */}
        <div className="w-full flex flex-row items-start justify-between px-14 gap-6">
          {/* Left column */}
          <div className="flex w-[700px] flex-col gap-6 px-2.5">
            {/* Your Tasks */}
            <section className="rounded-[8px] border border-[#E4E1DD] bg-[#FBF9F7] p-6">
              <h2 className="text-[21px] leading-[32px] font-semibold text-black">Your Tasks</h2>
              <div className="mt-4 flex items-center justify-between gap-3">
                <TaskCard label="Mensajes" icon={<MessageSquare className="h-5 w-5" />} count={7} />
                <TaskCard label="Envío" icon={<Truck className="h-5 w-5" />} count={7} />
                <TaskCard label="Visitas a la tienda" icon={<Store className="h-5 w-5" />} count={7} />
              </div>
            </section>

            {/* Messages */}
            <MessagesPanel />
          </div>

          {/* Right column */}
          <div className="flex w-[700px] flex-col gap-6 px-2.5">
            <CustomerCategoriesPanel />
          </div>
        </div>

        {/* No footer section on desktop */}
      </section>
    </main>
  );
}
