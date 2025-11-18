"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardHeader } from "../../../../../components/dashboard/DashboardHeader";
import DesktopHeader from "../../../../../components/dashboard/DesktopHeader";
import DesktopFooter from "../../../../../components/dashboard/DesktopFooter";
import Footer from "../../../../../components/layout/Footer";
import { ProductForm } from "../../../../../components/inventory/ProductForm";
import { NotificationOverlay } from "../../../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../../../components/overlays/LogoutOverlay";
import { useInventoryItem } from "../../../../../hooks";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { product, isSubmitting, updateProduct, deleteProduct, cancelEdit } = useInventoryItem(productId);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleSubmit = updateProduct;
  const handleCancel = cancelEdit;
  const handleConfirmDelete = deleteProduct;

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
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh mx-auto flex flex-col items-center pt-8 pb-8 gap-4 px-4 sm:px-5">
        <div className="w-full">
          <DashboardHeader />
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-[21px] leading-[32px] font-semibold text-black">Edit Product</h1>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3 py-1.5 rounded-[6px] bg-[#D11A2A] text-white text-[14px] leading-[20px] font-medium"
            >
              Delete
            </button>
          </div>
          <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
            <ProductForm product={product} onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
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
        <div className="w-full max-w-[1512px] flex flex-col gap-8 py-8 px-6 lg:px-10 2xl:px-[55px]">
          <DesktopHeader
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
          />

          <div className="w-full flex justify-center">
            <div className="w-full max-w-[680px] flex flex-col gap-6">
              <div className="w-full flex items-center justify-between">
                <h1 className="text-[21px] leading-[32px] font-semibold text-black">Edit Product</h1>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3 py-1.5 rounded-[6px] bg-[#D11A2A] text-white text-[14px] leading-[20px] font-medium"
                >
                  Delete
                </button>
              </div>
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
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[360px] rounded-[10px] bg-[#FDFCFB] border border-[#E4E1DD] p-4 flex flex-col gap-3">
            <h2 className="text-[18px] leading-[26px] font-semibold text-black">Delete product?</h2>
            <p className="text-[14px] leading-[20px] text-[#464646]">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 rounded-[6px] border border-[#E4E1DD] bg-white text-[14px] leading-[20px] text-[#464646]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-3 py-1.5 rounded-[6px] bg-[#D11A2A] text-white text-[14px] leading-[20px] font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

