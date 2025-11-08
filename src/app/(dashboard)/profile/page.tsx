"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../../../components/dashboard/DashboardHeader";
import DesktopHeader from "../../../components/dashboard/DesktopHeader";
import DesktopFooter from "../../../components/dashboard/DesktopFooter";
import Footer from "../../../components/layout/Footer";
import { PaymentMethodList } from "../../../components/payments/PaymentMethodList";
import { PaymentMethodForm } from "../../../components/payments/PaymentMethodForm";
import { PaymentMethodDeleteDialog } from "../../../components/payments/PaymentMethodDeleteDialog";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";
import { PaymentMethod } from "../../../types";
import { Plus, Edit2 } from "lucide-react";
import { Toast } from "../../../components/ui/Toast";

const getPaymentMethods = (): PaymentMethod[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("paymentMethods");
  return stored ? JSON.parse(stored) : [];
};

const savePaymentMethods = (methods: PaymentMethod[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("paymentMethods", JSON.stringify(methods));
};

const getUserProfile = () => {
  if (typeof window === "undefined") return { name: "", email: "", phone: "" };
  const email = localStorage.getItem("auth_email") || "";
  return {
    name: localStorage.getItem("user_name") || "User Name",
    email: email,
    phone: localStorage.getItem("user_phone") || "",
  };
};

const saveUserProfile = (profile: { name: string; email: string; phone: string }) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("user_name", profile.name);
  localStorage.setItem("user_phone", profile.phone);
};

export default function ProfilePage() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null);
  const [deletingPaymentId, setDeletingPaymentId] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPaymentMethods(getPaymentMethods());
    setProfile(getUserProfile());
  }, []);

  const handleAddPayment = () => {
    setEditingPaymentId(null);
    setShowPaymentForm(true);
  };

  const handleEditPayment = (id: string) => {
    setEditingPaymentId(id);
    setShowPaymentForm(true);
  };

  const handleDeletePayment = (id: string) => {
    setDeletingPaymentId(id);
  };

  const handleConfirmDelete = () => {
    if (deletingPaymentId) {
      const updated = paymentMethods.filter((pm) => pm.id !== deletingPaymentId);
      setPaymentMethods(updated);
      savePaymentMethods(updated);
      setDeletingPaymentId(null);
    }
  };

  const handlePaymentSubmit = (paymentData: Omit<PaymentMethod, "id">) => {
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      const methods = getPaymentMethods();
      if (editingPaymentId) {
        const index = methods.findIndex((pm) => pm.id === editingPaymentId);
        if (index !== -1) {
          methods[index] = { ...methods[index], ...paymentData };
        }
        setSuccessMessage("Payment method updated successfully!");
      } else {
        methods.push({
          ...paymentData,
          id: Date.now().toString(),
        });
        setSuccessMessage("Payment method added successfully!");
      }
      setPaymentMethods(methods);
      savePaymentMethods(methods);
      setShowPaymentForm(false);
      setEditingPaymentId(null);
      setIsSubmitting(false);
      setShowSuccessToast(true);
    }, 500);
  };

  const handleProfileSave = () => {
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      saveUserProfile(profile);
      setIsEditingProfile(false);
      setIsSubmitting(false);
      setSuccessMessage("Profile updated successfully!");
      setShowSuccessToast(true);
    }, 500);
  };

  const editingPayment = editingPaymentId
    ? paymentMethods.find((pm) => pm.id === editingPaymentId)
    : undefined;

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1]">
      {/* Mobile layout */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh mx-auto flex flex-col items-center pt-8 pb-8 gap-4">
        <div className="w-[390px]">
          <DashboardHeader />
        </div>

        <div className="w-[390px] px-3 flex flex-col gap-4">
          {/* Profile Section */}
          <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[21px] leading-[32px] font-semibold text-black">Profile</h2>
              {!isEditingProfile ? (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="p-2 hover:bg-[#F5F3F1] rounded-[4px] transition"
                  aria-label="Edit profile"
                >
                  <Edit2 className="w-4 h-4 text-[#464646]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleProfileSave}
                  disabled={isSubmitting}
                  className="text-[14px] text-[#09B558] font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-[12px] leading-[18px] text-[#464646]">Name</label>
                {isEditingProfile ? (
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                ) : (
                  <div className="text-[15px] leading-[22px] font-medium text-black">{profile.name}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[12px] leading-[18px] text-[#464646]">Email</label>
                <div className="text-[15px] leading-[22px] font-medium text-black">{profile.email}</div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[12px] leading-[18px] text-[#464646]">Phone</label>
                {isEditingProfile ? (
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                ) : (
                  <div className="text-[15px] leading-[22px] font-medium text-black">{profile.phone || "Not set"}</div>
                )}
              </div>
            </div>
          </div>

          {/* Payments Section */}
          <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[21px] leading-[32px] font-semibold text-black">Payments</h2>
              {!showPaymentForm && (
                <Button variant="primary" onClick={handleAddPayment} className="h-10 px-3 text-[14px]">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              )}
            </div>
            {showPaymentForm ? (
              <PaymentMethodForm
                paymentMethod={editingPayment}
                onSubmit={handlePaymentSubmit}
                onCancel={() => {
                  setShowPaymentForm(false);
                  setEditingPaymentId(null);
                }}
                isSubmitting={isSubmitting}
              />
            ) : (
              <PaymentMethodList
                paymentMethods={paymentMethods}
                onEdit={handleEditPayment}
                onDelete={handleDeletePayment}
              />
            )}
          </div>
        </div>

        <div className="w-[390px] mt-auto">
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
        </div>

        <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
        <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
        <PaymentMethodDeleteDialog
          open={deletingPaymentId !== null}
          onClose={() => setDeletingPaymentId(null)}
          onConfirm={handleConfirmDelete}
        />
      </section>

      {/* Desktop layout */}
      <section className="hidden lg:flex w-full flex-col">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1512px] flex flex-col gap-8 py-8 px-6 lg:px-10 2xl:px-[55px]">
            <DesktopHeader
              onNotify={() => setShowNotifications(true)}
              onLogout={() => setShowLogout(true)}
            />

            <div className="w-full flex justify-center">
              <div className="w-full max-w-[680px] flex flex-col gap-6">
                {/* Profile Section */}
                <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[21px] leading-[32px] font-semibold text-black">Profile</h2>
                    {!isEditingProfile ? (
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(true)}
                        className="p-2 hover:bg-[#F5F3F1] rounded-[4px] transition"
                        aria-label="Edit profile"
                      >
                        <Edit2 className="w-4 h-4 text-[#464646]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleProfileSave}
                        disabled={isSubmitting}
                        className="text-[14px] text-[#09B558] font-medium disabled:opacity-50"
                      >
                        {isSubmitting ? "Saving..." : "Save"}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] leading-[18px] text-[#464646]">Name</label>
                      {isEditingProfile ? (
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      ) : (
                        <div className="text-[15px] leading-[22px] font-medium text-black">{profile.name}</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] leading-[18px] text-[#464646]">Email</label>
                      <div className="text-[15px] leading-[22px] font-medium text-black">{profile.email}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] leading-[18px] text-[#464646]">Phone</label>
                      {isEditingProfile ? (
                        <Input
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      ) : (
                        <div className="text-[15px] leading-[22px] font-medium text-black">{profile.phone || "Not set"}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payments Section */}
                <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[21px] leading-[32px] font-semibold text-black">Payments</h2>
                    {!showPaymentForm && (
                      <Button variant="primary" onClick={handleAddPayment}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Payment Method
                      </Button>
                    )}
                  </div>
                  {showPaymentForm ? (
                    <PaymentMethodForm
                      paymentMethod={editingPayment}
                      onSubmit={handlePaymentSubmit}
                      onCancel={() => {
                        setShowPaymentForm(false);
                        setEditingPaymentId(null);
                      }}
                    />
                  ) : (
                    <PaymentMethodList
                      paymentMethods={paymentMethods}
                      onEdit={handleEditPayment}
                      onDelete={handleDeletePayment}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DesktopFooter />
      </section>

      <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
      <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
      <PaymentMethodDeleteDialog
        open={deletingPaymentId !== null}
        onClose={() => setDeletingPaymentId(null)}
        onConfirm={handleConfirmDelete}
      />
      <Toast
        message={successMessage}
        type="success"
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
    </main>
  );
}

