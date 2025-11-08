"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import Footer from "../../../components/layout/Footer";
import DesktopHeader from "../../../components/dashboard/DesktopHeader";
import DesktopFooter from "../../../components/dashboard/DesktopFooter";
import CustomerCategories, {
  demoCategories,
  type CategoryItem,
} from "../../../components/dashboard/CustomerCategories";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";

const CustomerCategoriesPage: React.FC = () => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>(demoCategories);

  const onToggleCategory = (id: string, next: boolean) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isOpen: next } : c))
    );
  };

  const openCount = useMemo(
    () => categories.filter((c) => c.isOpen).length,
    [categories]
  );
  void openCount;

  return (
    <div className="min-h-screen w-full bg-[#F5F3F1]">
      {/* Container wrapper */}
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col gap-8 px-0 pt-8 pb-8 lg:max-w-[1512px] lg:gap-8 lg:pt-10 lg:pb-10 lg:px-[60px] lg:bg-[#F5F3F1]">
        {/* Header section */}
        <div className="lg:hidden">
          <DashboardHeader />
        </div>
        <div className="hidden lg:block w-full">
          <DesktopHeader
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
          />
        </div>

        {/* Main content area */}
        <main className="flex-1 flex w-full flex-col justify-start gap-4 py-4 lg:gap-6 lg:py-0 lg:items-center lg:justify-start">
          {/* Customer Categories */}
          <div className="w-full max-w-[390px] lg:max-w-[1130px]">
            <CustomerCategories
              categories={categories}
              onToggleCategory={onToggleCategory}
            />
          </div>
        </main>

        {/* Notification Overlay */}
        <NotificationOverlay
          open={showNotifications}
          onClose={() => setShowNotifications(false)}
        />

        {/* Logout Overlay */}
        <LogoutOverlay
          open={showLogout}
          onClose={() => setShowLogout(false)}
          onConfirm={() => router.push("/login")}
        />

        {/* Footers */}
        <div className="lg:hidden">
          <Footer
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
          />
        </div>
        <div className="hidden lg:block w-full">
          <DesktopFooter />
        </div>
      </div>
    </div>
  );
};

export default CustomerCategoriesPage;
