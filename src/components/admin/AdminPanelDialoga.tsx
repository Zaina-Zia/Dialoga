"use client";
import React from "react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import Footer from "../../components/layout/Footer";
import DesktopHeader from "../dashboard/DesktopHeader";
import DesktopFooter from "../dashboard/DesktopFooter";
import { NotificationOverlay } from "../notifications/NotificationOverlay";
import { LogoutOverlay } from "../overlays/LogoutOverlay";

// Pixel-perfect Admin Panel - Dialoga Side (390x844)
// TypeScript + Tailwind, functional component, semantic markup.

type Row = {
  company: string;
  user: string;
  phone: string;
  token: string;
};

const rows: Row[] = [
  { company: "Abc Inc.", user: "abc.abc.abc.@gmail.com", phone: "000-000-0000", token: "dtg5dD" },
  { company: "efg Inc.", user: "test.emailaddress@gmail.com", phone: "000-000", token: "dtg5dD" },
  { company: "hij Inc.", user: "abc.abc.abc.@gmail.com", phone: "000-000-0000", token: "dtg5dD" },
  { company: "klm Inc.", user: "abc.abc.abc.@gmail.com", phone: "000-000", token: "dtg5dD" },
];

const UserBlock: React.FC = () => (
  <section className="w-[390px] h-[184px] flex flex-col items-start px-3 gap-4">
    {/* Avatar + name/email row */}
    <div className="w-[366px] h-[42px] flex items-start gap-[10px]">
      <div className="w-[45px] h-[45px] rounded-full grid place-items-center" style={{ background: "rgba(9, 181, 88, 0.25)" }}>
        <img src="/images/Dashboard_Home/accountCircle.png" alt="avatar" className="w-[29px] h-[29px] object-contain" />
      </div>
      <div className="w-[256px] h-[42px] flex flex-col items-start">
        <div className="w-[249px] h-[24px] text-[21px] leading-[32px] font-semibold text-black">Name of User</div>
        <div className="w-[138px] h-[18px] text-[12px] leading-[18px] font-normal text-black">figma......12@gmail.com</div>
      </div>
    </div>

    {/* Data table */}
    <div className="w-[366px] h-[126px] flex flex-col">
      {/* Header row */}
      <div className="w-[366px] h-[14px] border-b border-[rgba(70,70,70,0.25)] flex items-center">
        <div className="w-[69px] text-[8px] leading-[12px] font-medium text-black text-center">Company Name</div>
        <div className="w-[69px] text-[8px] leading-[10px] font-medium text-black text-center">User</div>
        <div className="w-[69px] text-[8px] leading-[10px] font-medium text-black text-center">Phone</div>
        <div className="w-[69px] text-[8px] leading-[10px] font-medium text-black text-center">API Token</div>
      </div>
      {/* Data rows (4), each 28px height with bottom border */}
      {rows.map((r, i) => (
        <div key={i} className="w-[366px] h-[28px] border-b border-[rgba(70,70,70,0.25)] flex items-center">
          <div className="w-[70.5px] text-[8px] leading-[12px] text-black text-center">{r.company}</div>
          <div className="w-[70.5px] text-[8px] leading-[12px] text-black text-center">{r.user}</div>
          <div className="w-[70.5px] text-[8px] leading-[12px] text-black text-center">{r.phone}</div>
          <div className="w-[70.5px] text-[8px] leading-[12px] text-black text-center">{r.token}</div>
        </div>
      ))}
    </div>
  </section>
);

const AdminPanelDialoga: React.FC<{ onNotify?: () => void; onLogout?: () => void }> = ({ onNotify, onLogout }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1]">
      {/* Mobile layout */}
      <section className="lg:hidden w-full max-w-[390px] min-h-[844px] mx-auto flex flex-col items-center pt-8 pb-8">
        <div className="w-[390px]"><DashboardHeader hideBack /></div>
        <div className="h-4" />
        <UserBlock />
        <div className="flex-1" />
        <div className="w-[390px]"><Footer onNotify={onNotify ?? (() => {})} onLogout={onLogout ?? (() => {})} /></div>
      </section>

      {/* Desktop layout */}
      <section className="hidden lg:flex w-full justify-center">
        <div className="w-full max-w-[1512px] flex flex-col gap-8 py-8 px-0">
          <DesktopHeader />

          {/* Content area: centered 1130px block */}
          <div className="w-full grid place-items-center">
            <div className="w-[1130px] flex flex-col gap-[21px]">
              {/* Profile row */}
              <div className="w-full h-[42px] flex items-start gap-[10px]">
                <div className="h-[40px] w-[40px] rounded-full" style={{ background: "rgba(9, 181, 88, 0.25)" }} />
                <div className="flex flex-col">
                  <div className="text-[21px] leading-[32px] font-semibold text-black">Name of User</div>
                  <div className="text-[12px] leading-[18px] text-black">figma......12@gmail.com</div>
                </div>
              </div>

              {/* Title */}
              <div className="w-full h-[42px]">
                <div className="text-[21px] leading-[32px] font-bold text-black">Admin Panel</div>
              </div>

              {/* Table */}
              <div className="w-full flex flex-col">
                {/* Header row */}
                <div className="w-full h-[27px] border-b border-[rgba(70,70,70,0.25)] flex items-center">
                  <div className="flex-1 text-[15px] leading-[22px] font-medium text-black text-center">Company Name</div>
                  <div className="flex-1 text-[15px] leading-[22px] font-medium text-black text-center">User</div>
                  <div className="flex-1 text-[15px] leading-[22px] font-medium text-black text-center">Phone</div>
                  <div className="flex-1 text-[15px] leading-[22px] font-medium text-black text-center">API Token</div>
                </div>
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-full h-[27px] border-b border-[rgba(70,70,70,0.25)] flex items-center">
                    <div className="flex-1 text-[15px] leading-[22px] text-black text-center">Abc Inc.</div>
                    <div className="flex-1 text-[15px] leading-[22px] text-black text-center">abc.abc.abc.@gmail.com</div>
                    <div className="flex-1 text-[15px] leading-[22px] text-black text-center">000-000-0000</div>
                    <div className="flex-1 text-[15px] leading-[22px] text-black text-center">dtg5dD</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DesktopFooter />
        </div>
      </section>
    </main>
  );
};

export default AdminPanelDialoga;
