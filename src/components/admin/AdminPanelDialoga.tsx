"use client";
import React, { useState, useEffect } from "react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import Footer from "../../components/layout/Footer";
import DesktopHeader from "../dashboard/DesktopHeader";
import DesktopFooter from "../dashboard/DesktopFooter";
import { NotificationOverlay } from "../notifications/NotificationOverlay";
import { LogoutOverlay } from "../overlays/LogoutOverlay";
import { CompanyForm } from "./CompanyForm";
import { StatusToggle } from "./StatusToggle";
import { Button } from "../ui/Button";
import { Company } from "../../types";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

// Pixel-perfect Admin Panel - Dialoga Side (390x844)
// TypeScript + Tailwind, functional component, semantic markup.

const getCompanies = (): Company[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("admin_companies");
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as unknown[];
      return parsed.map((item: any) => ({
        id: item.id || "",
        name: item.name || "",
        user: item.user || "",
        phone: item.phone || "",
        token: item.token || "",
        status: (item.status === "paused" ? "paused" : "active") as "active" | "paused",
      }));
    } catch {
      return [];
    }
  }
  return [
    { id: "1", name: "Abc Inc.", user: "abc.abc.abc.@gmail.com", phone: "000-000-0000", token: "dtg5dD", status: "active" as const },
    { id: "2", name: "efg Inc.", user: "test.emailaddress@gmail.com", phone: "000-000", token: "dtg5dD", status: "active" as const },
    { id: "3", name: "hij Inc.", user: "abc.abc.abc.@gmail.com", phone: "000-000-0000", token: "dtg5dD", status: "paused" as const },
    { id: "4", name: "klm Inc.", user: "abc.abc.abc.@gmail.com", phone: "000-000", token: "dtg5dD", status: "active" as const },
  ];
};

const saveCompanies = (companies: Company[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_companies", JSON.stringify(companies));
};

type UserBlockProps = {
  companies: Company[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: "active" | "paused") => void;
};

const UserBlock: React.FC<UserBlockProps> = ({ companies, onEdit, onDelete, onStatusChange }) => (
  <section className="w-full max-w-[390px] flex flex-col items-start px-4 sm:px-5 gap-4">
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
    <div className="w-[366px] flex flex-col">
      {/* Header row */}
      <div className="w-[366px] h-[14px] border-b border-[rgba(70,70,70,0.25)] flex items-center">
        <div className="w-[50px] text-[8px] leading-[12px] font-medium text-black text-center">Status</div>
        <div className="w-[60px] text-[8px] leading-[12px] font-medium text-black text-center">Company</div>
        <div className="w-[60px] text-[8px] leading-[10px] font-medium text-black text-center">User</div>
        <div className="w-[50px] text-[8px] leading-[10px] font-medium text-black text-center">Phone</div>
        <div className="w-[50px] text-[8px] leading-[10px] font-medium text-black text-center">Token</div>
        <div className="w-[46px] text-[8px] leading-[10px] font-medium text-black text-center">Actions</div>
      </div>
      {/* Data rows */}
      {companies.map((r) => (
        <div key={r.id} className="w-[366px] min-h-[28px] border-b border-[rgba(70,70,70,0.25)] flex items-center py-1">
          <div className="w-[50px] flex justify-center">
            <StatusToggle status={r.status} onChange={(status) => onStatusChange(r.id, status)} />
          </div>
          <div className="w-[60px] text-[8px] leading-[12px] text-black text-center truncate">{r.name}</div>
          <div className="w-[60px] text-[8px] leading-[12px] text-black text-center truncate">{r.user}</div>
          <div className="w-[50px] text-[8px] leading-[12px] text-black text-center truncate">{r.phone}</div>
          <div className="w-[50px] text-[8px] leading-[12px] text-black text-center truncate">{r.token}</div>
          <div className="w-[46px] flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(r.id)}
              className="p-1 hover:bg-[#F5F3F1] rounded transition"
              aria-label="Edit"
            >
              <Edit2 className="w-3 h-3 text-[#464646]" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(r.id)}
              className="p-1 hover:bg-[#F5F3F1] rounded transition"
              aria-label="Delete"
            >
              <Trash2 className="w-3 h-3 text-[#464646]" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const AdminPanelDialoga: React.FC<{ onNotify?: () => void; onLogout?: () => void }> = ({ onNotify, onLogout }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCompanies(getCompanies());
  }, []);

  const handleCreate = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      const updated = companies.filter((c) => c.id !== id);
      setCompanies(updated);
      saveCompanies(updated);
    }
  };

  const handleStatusChange = (id: string, status: "active" | "paused") => {
    const updated = companies.map((c) => (c.id === id ? { ...c, status } : c));
    setCompanies(updated);
    saveCompanies(updated);
  };

  const handleSubmit = (companyData: Omit<Company, "id">) => {
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      if (editingId) {
        const updated = companies.map((c) => (c.id === editingId ? { ...c, ...companyData } : c));
        setCompanies(updated);
        saveCompanies(updated);
      } else {
        const newCompany: Company = {
          ...companyData,
          id: Date.now().toString(),
        };
        const updated = [...companies, newCompany];
        setCompanies(updated);
        saveCompanies(updated);
      }
      setIsSubmitting(false);
      setShowForm(false);
      setEditingId(null);
    }, 500);
  };

  const editingCompany = editingId ? companies.find((c) => c.id === editingId) : undefined;

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1]">
      {/* Mobile layout */}
      <section className="lg:hidden w-full max-w-[390px] min-h-[844px] mx-auto flex flex-col items-center pt-8 pb-8 gap-4 px-4 sm:px-5">
        <div className="w-full"><DashboardHeader hideBack /></div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[21px] leading-[32px] font-semibold text-black">Admin Panel</h1>
            {!showForm && (
              <Button variant="primary" onClick={handleCreate} className="h-10 px-3 text-[14px]">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            )}
          </div>
          {showForm ? (
            <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
              <CompanyForm
                company={editingCompany}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                isSubmitting={isSubmitting}
              />
            </div>
          ) : (
            <>
              <UserBlock companies={companies} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
              
              {/* Provider Links Section */}
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-[18px] leading-[27px] font-semibold text-black">Provider Settings</h2>
                <div className="w-full flex flex-col gap-2">
                  <Link href="/admin-panel-dialoga/messaging-providers" className="w-full h-[50px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] px-3 py-2 flex items-center justify-between active:opacity-90">
                    <span className="text-[15px] leading-[22px] font-medium text-black">Messaging Providers</span>
                    <svg width="15.5" height="15.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link href="/admin-panel-dialoga/ai-providers" className="w-full h-[50px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] px-3 py-2 flex items-center justify-between active:opacity-90">
                    <span className="text-[15px] leading-[22px] font-medium text-black">AI Providers</span>
                    <svg width="15.5" height="15.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 6L16 12L10 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex-1" />
        <div className="w-full"><Footer onNotify={onNotify ?? (() => {})} onLogout={onLogout ?? (() => {})} /></div>
      </section>

      {/* Desktop layout */}
      <section className="hidden lg:flex w-full justify-center">
        <div className="w-full max-w-[1512px] flex flex-col gap-8 py-8 px-6 lg:px-10 2xl:px-[55px]">
          <DesktopHeader
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
            showAdminControl
          />

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
              <div className="w-full h-[42px] flex items-center justify-between">
                <div className="text-[21px] leading-[32px] font-bold text-black">Admin Panel</div>
                {!showForm && (
                  <Button variant="primary" onClick={handleCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Company
                  </Button>
                )}
              </div>

              {showForm ? (
                <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-6">
                  <CompanyForm
                    company={editingCompany}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    isSubmitting={isSubmitting}
                  />
                </div>
              ) : (
                <>
                  {/* Table */}
                  <div className="w-full flex flex-col">
                    {/* Header row */}
                    <div className="w-full h-[27px] border-b border-[rgba(70,70,70,0.25)] flex items-center">
                      <div className="w-[100px] text-[15px] leading-[22px] font-medium text-black text-center">Status</div>
                      <div className="flex-1 text-[15px] leading-[22px] font-medium text-black text-center">Company Name</div>
                      <div className="flex-1 text-[15px] leading-[22px] font-medium text-black text-center">User</div>
                      <div className="flex-1 text-[15px] leading-[22px] font-medium text-black text-center">Phone</div>
                      <div className="flex-1 text-[15px] leading-[22px] font-medium text-black text-center">API Token</div>
                      <div className="w-[120px] text-[15px] leading-[22px] font-medium text-black text-center">Actions</div>
                    </div>
                    {companies.map((c) => (
                      <div key={c.id} className="w-full min-h-[27px] border-b border-[rgba(70,70,70,0.25)] flex items-center py-2">
                        <div className="w-[100px] flex justify-center">
                          <StatusToggle status={c.status} onChange={(status) => handleStatusChange(c.id, status)} />
                        </div>
                        <div className="flex-1 text-[15px] leading-[22px] text-black text-center">{c.name}</div>
                        <div className="flex-1 text-[15px] leading-[22px] text-black text-center">{c.user}</div>
                        <div className="flex-1 text-[15px] leading-[22px] text-black text-center">{c.phone}</div>
                        <div className="flex-1 text-[15px] leading-[22px] text-black text-center">{c.token}</div>
                        <div className="w-[120px] flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(c.id)}
                            className="p-2 hover:bg-[#F5F3F1] rounded transition"
                            aria-label="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-[#464646]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(c.id)}
                            className="p-2 hover:bg-[#F5F3F1] rounded transition"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-[#464646]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Provider Links Section */}
                  <div className="w-full flex flex-col gap-4 mt-6">
                    <h2 className="text-[21px] leading-[32px] font-semibold text-black">Provider Settings</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/admin-panel-dialoga/messaging-providers" className="flex h-[61px] w-full items-center gap-4 rounded-[8px] border border-[rgba(70,70,70,0.25)] bg-[#FDFCFB] px-[6px] py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] hover:bg-[#F5F3F1] transition">
                        <div className="grid h-[45px] w-[45px] place-items-center rounded-full bg-[#F5F3F1]">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[15px] leading-[22px] font-medium text-black">Messaging Providers</span>
                          <span className="text-[12px] leading-[18px] text-black">Configure messaging services</span>
                        </div>
                      </Link>
                      <Link href="/admin-panel-dialoga/ai-providers" className="flex h-[61px] w-full items-center gap-4 rounded-[8px] border border-[rgba(70,70,70,0.25)] bg-[#FDFCFB] px-[6px] py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] hover:bg-[#F5F3F1] transition">
                        <div className="grid h-[45px] w-[45px] place-items-center rounded-full bg-[#F5F3F1]">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[15px] leading-[22px] font-medium text-black">AI Providers</span>
                          <span className="text-[12px] leading-[18px] text-black">Configure AI services</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <DesktopFooter />

          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => (window.location.href = "/login")} />
        </div>
      </section>
    </main>
  );
};

export default AdminPanelDialoga;
