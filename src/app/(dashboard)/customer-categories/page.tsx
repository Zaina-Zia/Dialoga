"use client";
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '../../../components/dashboard/DashboardHeader';
import Footer from '../../../components/layout/Footer';
import CustomerCategories, { demoCategories, type CategoryItem } from '../../../components/dashboard/CustomerCategories';

// Page wrapper for Customer Categories. Designed mobile-first but responsive.
// Backend hooks:
// - Fetch categories on mount and replace local state.
// - Wire onNotify/onLogout and onToggleCategory to real handlers.
const CustomerCategoriesPage: React.FC = () => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>(demoCategories);

  const onToggleCategory = (id: string, next: boolean) => {
    setCategories((prev: CategoryItem[]) => prev.map((c: CategoryItem) => (c.id === id ? { ...c, isOpen: next } : c)));
  };

  const openCount = useMemo(() => categories.filter((c: CategoryItem) => c.isOpen).length, [categories]);
  void openCount;

  return (
    <div className="min-h-screen w-full bg-stone-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col justify-between pt-8 pb-8">
        <DashboardHeader />

        <main className="flex-1 flex flex-col justify-start gap-4 py-4">
          <CustomerCategories categories={categories} onToggleCategory={onToggleCategory} />
        </main>

        {/* Notifications overlay */}
        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />

        <Footer onNotify={() => setShowNotifications(true)} onLogout={() => router.push('/login')} />
      </div>
    </div>
  );
};

export default CustomerCategoriesPage;

function NotificationOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const items = [
    { title: 'Title of notification', time: '15:45, Sep 05, 2025' },
    { title: 'Title of notification', time: '15:45, Sep 05, 2025' },
    { title: 'Title of notification', time: '15:45, Sep 05, 2025' },
    { title: 'Title of notification', time: '15:45, Sep 05, 2025' },
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
