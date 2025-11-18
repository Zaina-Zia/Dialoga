"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import DesktopHeader from "../../../components/dashboard/DesktopHeader";
import DesktopFooter from "../../../components/dashboard/DesktopFooter";
import Footer from "../../../components/layout/Footer";
import { ProductList } from "../../../components/inventory/ProductList";
import { Button } from "../../../components/ui/Button";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";
import { RoleGuard } from "../../../components/guards/RoleGuard";
import { useInventoryList } from "../../../hooks";
import { Plus } from "lucide-react";

export default function InventoryPage() {
  const router = useRouter();
  const { products } = useInventoryList();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <RoleGuard>
      <main className="min-h-dvh w-full bg-[#F5F3F1]">
      {/* Mobile layout */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh mx-auto flex flex-col items-center pt-8 pb-8 gap-4 px-4 sm:px-5">
        <div className="w-full">
          <DashboardHeader />
        </div>

        <div className="w-full flex flex-col gap-4">
          {/* Header */}
          <div className="w-full flex items-center justify-between">
            <h1 className="text-[21px] leading-[32px] font-semibold text-black">Inventory</h1>
            <Link href="/inventory/create">
              <Button variant="primary" className="h-10 px-3 text-[14px]">
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Products list */}
          <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
            <ProductList products={products} />
          </div>
        </div>

        <div className="w-full mt-auto">
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
        </div>

        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
      </section>

      {/* Desktop layout */}
      <section className="hidden lg:flex w-full justify-center">
        <div className="w-full max-w-[1512px] flex flex-col gap-8 py-8 px-4 sm:px-6 lg:px-10 2xl:px-[55px]">
          <DesktopHeader
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
          />

          <div className="w-full flex flex-col gap-6">
            {/* Header */}
            <div className="w-full flex items-center justify-between">
              <h1 className="text-[21px] leading-[32px] font-semibold text-black">Inventory</h1>
              <Link href="/inventory/create">
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>

            {/* Products list */}
            <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-6">
              <ProductList products={products} />
            </div>
          </div>

          <DesktopFooter />

          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
        </div>
      </section>
    </main>
    </RoleGuard>
  );
}

