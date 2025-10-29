"use client";
import React from "react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { TaskStatCard } from "../../components/dashboard/TaskStatCard";
import { MessageItem } from "../../components/dashboard/MessageItem";
import { CategoryCard } from "../../components/dashboard/CategoryCard";
import { YourTasksSection } from "../../components/dashboard/YourTasksSection";

export default function DashboardHomePage() {
  const logout = () => {
    window.location.href = "/login";
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
    <main className="min-h-dvh w-full grid place-items-center">
      {/* Mobile artboard 390x958 */}
      <section className="w-full max-w-[390px] min-h-dvh flex flex-col items-center bg-[#F5F3F1] pt-8 pb-8 gap-[50px]">
        {/* Frame 35 */}
        <div className="w-[390px] flex flex-col gap-4">
          {/* Header + divider */}
          <DashboardHeader />
          <div className="w-full border-t border-black" />

          {/* Content area px-3 gap-4 */}
          <div className="w-[390px] px-3 flex flex-col items-center gap-4">
            {/* Your Tasks card */}
            <YourTasksSection tasks={tasks} />

            {/* Mensajes list */}
            <div className="w-[358px] h-[327px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px]">
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

            {/* Customer Categories */}
            <div className="w-[358px] h-[218px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px]">
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
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="w-[390px] h-[62.09px] mx-auto flex flex-col items-center gap-4">
            {/* Line 1 */}
            <div className="w-[390px] border-t border-black" />
            {/* Frame 7 */}
            <div className="w-[390px] h-[45px] px-[42px]">
              {/* Footer Icons */}
              <div className="mx-auto w-[254px] h-[45px] flex items-start justify-center gap-[32px]">
                {/* Hidden slot (kept for structure, not rendered) */}
                {/* <div className="w-[74px] h-[45px] hidden md:flex flex-col items-center gap-[2px]" /> */}

                {/* Notification */}
                <div className="w-[111px] h-[45px] flex flex-col items-center gap-[2px]">
                  <div className="w-[28px] h-[28px] relative">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute" style={{ left: "4px", top: "4px" }}>
                      <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#464646" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div className="w-[58px] h-[15px] text-center text-[10px] leading-[15px] font-medium text-black">Notification</div>
                </div>

                {/* Logout */}
                <div className="w-[111px] h-[45px] flex flex-col items-center gap-[2px]">
                  <div className="w-[28px] h-[28px] relative cursor-pointer" onClick={logout}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute" style={{ left: "4px", top: "4px" }}>
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 17l5-5-5-5" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 12H9" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="w-[47px] h-[12px] text-center text-[10px] leading-[15px] font-medium text-black">Logout</div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
