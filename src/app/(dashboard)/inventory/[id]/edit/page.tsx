"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DashboardHeader } from "../../../../../components/dashboard/DashboardHeader";
import DesktopHeader from "../../../../../components/dashboard/DesktopHeader";
import DesktopFooter from "../../../../../components/dashboard/DesktopFooter";
import Footer from "../../../../../components/layout/Footer";
import { ProductForm } from "../../../../../components/inventory/ProductForm";
import { NotificationOverlay } from "../../../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../../../components/overlays/LogoutOverlay";
import { Product } from "../../../../../types";

const getProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("products");
  return stored ? JSON.parse(stored) : [];
};

const saveProducts = (products: Product[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("products", JSON.stringify(products));
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const products = getProducts();
    const found = products.find((p) => p.id === productId);
    if (found) {
      setProduct(found);
    } else {
      router.push("/inventory");
    }
  }, [productId, router]);

  const handleSubmit = (productData: Omit<Product, "id">) => {
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      const products = getProducts();
      const index = products.findIndex((p) => p.id === productId);
      if (index !== -1) {
        products[index] = {
          ...products[index],
          ...productData,
          updatedAt: new Date().toISOString(),
        };
        saveProducts(products);
        setIsSubmitting(false);
        router.push("/inventory");
      }
    }, 500);
  };

  const handleCancel = () => {
    router.push("/inventory");
  };

  if (!product) {
    return (
      <main className="min-h-dvh w-full bg-[#F5F3F1] flex items-center justify-center">
        <div className="text-[15px] leading-[22px] text-[#464646]">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1]">
      {/* Mobile layout */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh mx-auto flex flex-col items-center pt-8 pb-8 gap-4">
        <div className="w-[390px]">
          <DashboardHeader />
        </div>

        <div className="w-[390px] px-3 flex flex-col gap-4">
          <h1 className="text-[21px] leading-[32px] font-semibold text-black">Edit Product</h1>
          <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
            <ProductForm product={product} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
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
              <h1 className="text-[21px] leading-[32px] font-semibold text-black">Edit Product</h1>
              <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-6">
                <ProductForm product={product} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
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

