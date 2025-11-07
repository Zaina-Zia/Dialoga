"use client";
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '../../../components/dashboard/DashboardHeader';
import Footer from '../../../components/layout/Footer';
import DesktopHeader from '../../../components/dashboard/DesktopHeader';
import DesktopFooter from '../../../components/dashboard/DesktopFooter';
import CustomerCategories, { demoCategories, type CategoryItem } from '../../../components/dashboard/CustomerCategories';
import { NotificationOverlay } from '../../../components/notifications/NotificationOverlay';
import { LogoutOverlay } from '../../../components/overlays/LogoutOverlay';

// Page wrapper for Customer Categories. Designed mobile-first but responsive.
// Backend hooks:
// - Fetch categories on mount and replace local state.
// - Wire onNotify/onLogout and onToggleCategory to real handlers.
const CustomerCategoriesPage: React.FC = () => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>(demoCategories);

  const onToggleCategory = (id: string, next: boolean) => {
    setCategories((prev: CategoryItem[]) => prev.map((c: CategoryItem) => (c.id === id ? { ...c, isOpen: next } : c)));
  };

  const openCount = useMemo(() => categories.filter((c: CategoryItem) => c.isOpen).length, [categories]);
  void openCount;

  return (
    <div className="min-h-screen w-full bg-[#F5F3F1]">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] lg:max-w-[1512px] flex-col justify-between pt-8 pb-8 px-0 lg:px-10">
        {/* Headers: mobile vs desktop */}
        <div className="lg:hidden"><DashboardHeader /></div>
        <div className="hidden lg:block"><DesktopHeader onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} /></div>

        <main className="flex-1 flex flex-col justify-start gap-4 py-4">
          <CustomerCategories categories={categories} onToggleCategory={onToggleCategory} />
        </main>

        {/* Notifications overlay */}
        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />

        {/* Logout overlay */}
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push('/login')} />

        {/* Footers: mobile vs desktop */}
        <div className="lg:hidden">
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
        </div>
        <div className="hidden lg:block">
          <DesktopFooter />
        </div>
      </div>
    </div>
  );
};

export default CustomerCategoriesPage;
