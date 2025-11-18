"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import DesktopHeader from "../../../components/dashboard/DesktopHeader";
import { useRouter } from "next/navigation";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";

// Admin Panel page - Super Admin ONLY
// Super Admin does NOT have access to chats, inventory, or customer categories
// Their access is ONLY for the management section (Manage Companies)
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
      // Only allow superadmin@example.com or admin@example.com (legacy)
      if ((email !== "superadmin@example.com" && email !== "admin@example.com") || !pwd) {
        router.replace("/dashboard");
      }
    } catch (_) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1] overflow-x-hidden">
      {/* Mobile container */}
      <section className="lg:hidden w-full max-w-[390px] min-h-[958.09px] mx-auto flex flex-col items-center gap-[11px] py-8 px-4 sm:px-5">
        <div className="w-full flex flex-col">
          <DashboardHeader />
        </div>
        <div className="w-full flex flex-col items-center gap-4 pb-4">
          {/* Super-Admin Quick Access - ONLY section visible to Super Admin */}
          <Link href="/admin-panel-dialoga" className="w-full h-[61px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] px-3 py-2 flex items-center justify-between active:opacity-90">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] bg-[#F5F3F1] rounded-[4px] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[15px] leading-[22px] font-medium text-black">Manage Companies</span>
                <span className="text-[12px] leading-[18px] text-[#464646]">Super-Admin Panel</span>
              </div>
            </div>
            <div className="w-[15.5px] h-[15.5px] inline-flex items-center justify-center" aria-hidden>
              <svg width="15.5" height="15.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
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
          {/* Super-Admin Quick Access - ONLY section visible to Super Admin */}
          <div className="w-full flex justify-center">
            <Link href="/admin-panel-dialoga" className="flex h-[61px] w-full max-w-[680px] items-center gap-4 rounded-[8px] border border-[rgba(70,70,70,0.25)] bg-[#FDFCFB] px-[6px] py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] hover:bg-[#F5F3F1] transition">
              <div className="grid h-[45px] w-[45px] place-items-center rounded-full bg-[#F5F3F1]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[15px] leading-[22px] font-medium text-black">Manage Companies</span>
                <span className="text-[12px] leading-[18px] text-black">Super-Admin Panel - Create, edit, and manage all companies</span>
              </div>
              <div className="ml-auto">
                <svg width="15.5" height="15.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Overlays */}
          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
        </div>
      </section>
    </main>
  );
}
