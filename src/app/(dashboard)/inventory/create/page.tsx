"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../../../../components/dashboard/DashboardHeader";
import DesktopHeader from "../../../../components/dashboard/DesktopHeader";
import DesktopFooter from "../../../../components/dashboard/DesktopFooter";
import Footer from "../../../../components/layout/Footer";
import { ProductForm } from "../../../../components/inventory/ProductForm";
import { NotificationOverlay } from "../../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../../components/overlays/LogoutOverlay";
import { Product } from "../../../../types";

const getProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("products");
  return stored ? JSON.parse(stored) : [];
};

const saveProducts = (products: Product[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("products", JSON.stringify(products));
};

export default function CreateProductPage() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (productData: Omit<Product, "id">) => {
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      const products = getProducts();
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      products.push(newProduct);
      saveProducts(products);
      setIsSubmitting(false);
      router.push("/inventory");
    }, 500);
  };

  const handleCancel = () => {
    router.push("/inventory");
  };

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1]">
      {/* Mobile layout */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh mx-auto flex flex-col items-center pt-8 pb-8 gap-4">
        <div className="w-[390px]">
          <DashboardHeader />
        </div>

        <div className="w-[390px] px-3 flex flex-col gap-4">
          <h1 className="text-[21px] leading-[32px] font-semibold text-black">Create Product</h1>
          <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
            <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
          </div>
        </div>

        <div className="w-[390px] mt-auto">
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
        </div>

        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
      </section>

      {/* Desktop layout */}
      <section className="hidden lg:flex w-full justify-center">
        <div className="w-full max-w-[1512px] flex flex-col gap-8 py-8 px-6 lg:px-10 2xl:px-[55px]">
          <DesktopHeader
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
          />

          <div className="w-full flex justify-center">
            <div className="w-full max-w-[680px] flex flex-col gap-6">
              <h1 className="text-[21px] leading-[32px] font-semibold text-black">Create Product</h1>
              <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-6">
                <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
              </div>
            </div>
          </div>

          <DesktopFooter />

          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
        </div>
      </section>
    </main>
  );
}

