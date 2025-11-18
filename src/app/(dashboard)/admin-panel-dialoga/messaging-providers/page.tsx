"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "../../../../components/dashboard/DashboardHeader";
import DesktopHeader from "../../../../components/dashboard/DesktopHeader";
import DesktopFooter from "../../../../components/dashboard/DesktopFooter";
import Footer from "../../../../components/layout/Footer";
import { Input } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { NotificationOverlay } from "../../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../../components/overlays/LogoutOverlay";
import { Edit2, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

type MessagingProvider = {
  id: string;
  name: string;
  apiKey: string;
  endpointUrl: string;
  status: "active" | "inactive";
};

const getProviders = (): MessagingProvider[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("messaging_providers");
  return stored ? JSON.parse(stored) : [];
};

const saveProviders = (providers: MessagingProvider[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("messaging_providers", JSON.stringify(providers));
};

export default function MessagingProvidersPage() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [providers, setProviders] = useState<MessagingProvider[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [providerName, setProviderName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [endpointUrl, setEndpointUrl] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("inactive");

  useEffect(() => {
    setProviders(getProviders());
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setProviderName("");
    setApiKey("");
    setEndpointUrl("");
    setStatus("inactive");
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    const provider = providers.find((p) => p.id === id);
    if (provider) {
      setEditingId(id);
      setProviderName(provider.name);
      setApiKey(provider.apiKey);
      setEndpointUrl(provider.endpointUrl);
      setStatus(provider.status);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this provider?")) {
      const updated = providers.filter((p) => p.id !== id);
      setProviders(updated);
      saveProviders(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...providers];
    if (editingId) {
      const index = updated.findIndex((p) => p.id === editingId);
      if (index !== -1) {
        updated[index] = { id: editingId, name: providerName, apiKey, endpointUrl, status };
      }
    } else {
      updated.push({ id: Date.now().toString(), name: providerName, apiKey, endpointUrl, status });
    }
    setProviders(updated);
    saveProviders(updated);
    setShowForm(false);
    setEditingId(null);
    setProviderName("");
    setApiKey("");
    setEndpointUrl("");
    setStatus("inactive");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setProviderName("");
    setApiKey("");
    setEndpointUrl("");
    setStatus("inactive");
  };

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1]">
      {/* Mobile layout */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh mx-auto flex flex-col items-center pt-8 pb-8 gap-4 px-4 sm:px-5">
        <div className="w-full">
          <DashboardHeader />
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[21px] leading-[32px] font-semibold text-black">Messaging Providers</h1>
            {!showForm && (
              <Button variant="primary" onClick={handleAdd} className="h-10 px-3 text-[14px]">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            )}
          </div>
          {showForm ? (
            <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[15px] leading-[22px] font-medium text-black">Provider Name</label>
                <Input
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  placeholder="e.g., Twilio, WhatsApp Business"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[15px] leading-[22px] font-medium text-black">API Key / Credentials</label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter API key"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[15px] leading-[22px] font-medium text-black">Endpoint URL</label>
                <Input
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  placeholder="https://api.example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[15px] leading-[22px] font-medium text-black">Status</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus("active")}
                    className={`flex-1 h-11 rounded-md border text-[16px] font-medium transition ${
                      status === "active"
                        ? "bg-[#09B558] text-white border-[#09B558]"
                        : "bg-[#FDFCFB] text-[#464646] border-[#03121F]/20"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("inactive")}
                    className={`flex-1 h-11 rounded-md border text-[16px] font-medium transition ${
                      status === "inactive"
                        ? "bg-[#464646] text-white border-[#464646]"
                        : "bg-[#FDFCFB] text-[#464646] border-[#03121F]/20"
                    }`}
                  >
                    Inactive
                  </button>
                </div>
              </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="secondary" onClick={handleCancel} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    {editingId ? "Update" : "Save"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-3">
              {providers.length === 0 ? (
                <div className="text-center py-8 text-[#464646] text-[15px]">No messaging providers configured yet.</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {providers.map((provider) => (
                    <div key={provider.id} className="w-full p-3 border border-[#E4E1DD] rounded-[8px] bg-[#F5F3F1]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-[15px] leading-[22px] font-medium text-black">{provider.name}</span>
                          <span className="text-[12px] leading-[18px] text-[#464646]">{provider.endpointUrl || "No endpoint"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[12px] px-2 py-1 rounded ${provider.status === "active" ? "bg-[#09B558]/20 text-[#09B558]" : "bg-[#464646]/20 text-[#464646]"}`}>
                            {provider.status}
                          </span>
                          <button type="button" onClick={() => handleEdit(provider.id)} className="p-1 hover:bg-[#FDFCFB] rounded" aria-label="Edit">
                            <Edit2 className="w-4 h-4 text-[#464646]" />
                          </button>
                          <button type="button" onClick={() => handleDelete(provider.id)} className="p-1 hover:bg-[#FDFCFB] rounded" aria-label="Delete">
                            <Trash2 className="w-4 h-4 text-[#464646]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
            showAdminControl
          />

          <div className="w-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-[21px] leading-[32px] font-semibold text-black">Messaging Providers</h1>
              {!showForm && (
                <Button variant="primary" onClick={handleAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Provider
                </Button>
              )}
            </div>
            {showForm ? (
              <div className="w-full max-w-[680px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] leading-[22px] font-medium text-black">Provider Name</label>
                  <Input
                    value={providerName}
                    onChange={(e) => setProviderName(e.target.value)}
                    placeholder="e.g., Twilio, WhatsApp Business"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] leading-[22px] font-medium text-black">API Key / Credentials</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter API key"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] leading-[22px] font-medium text-black">Endpoint URL</label>
                  <Input
                    value={endpointUrl}
                    onChange={(e) => setEndpointUrl(e.target.value)}
                    placeholder="https://api.example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] leading-[22px] font-medium text-black">Status</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus("active")}
                      className={`flex-1 h-11 rounded-md border text-[16px] font-medium transition ${
                        status === "active"
                          ? "bg-[#09B558] text-white border-[#09B558]"
                          : "bg-[#FDFCFB] text-[#464646] border-[#03121F]/20"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus("inactive")}
                      className={`flex-1 h-11 rounded-md border text-[16px] font-medium transition ${
                        status === "inactive"
                          ? "bg-[#464646] text-white border-[#464646]"
                          : "bg-[#FDFCFB] text-[#464646] border-[#03121F]/20"
                      }`}
                    >
                      Inactive
                    </button>
                  </div>
                </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="secondary" onClick={handleCancel} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" className="flex-1">
                      {editingId ? "Update" : "Save"}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full max-w-[680px] rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] p-6">
                {providers.length === 0 ? (
                  <div className="text-center py-12 text-[#464646] text-[15px]">No messaging providers configured yet. Click "Add Provider" to get started.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {providers.map((provider) => (
                      <div key={provider.id} className="w-full p-4 border border-[#E4E1DD] rounded-[8px] bg-[#F5F3F1]">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex flex-col gap-1">
                            <span className="text-[15px] leading-[22px] font-medium text-black">{provider.name}</span>
                            <span className="text-[12px] leading-[18px] text-[#464646] truncate">{provider.endpointUrl || "No endpoint"}</span>
                          </div>
                          <span className={`text-[12px] px-2 py-1 rounded ${provider.status === "active" ? "bg-[#09B558]/20 text-[#09B558]" : "bg-[#464646]/20 text-[#464646]"}`}>
                            {provider.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button 
                            type="button" 
                            onClick={() => handleEdit(provider.id)} 
                            className="flex-1 h-9 bg-[#FDFCFB] border border-[#E4E1DD] rounded-[4px] flex items-center justify-center gap-2" 
                            aria-label="Edit"
                            whileHover={{ 
                              scale: 1.02,
                              backgroundColor: "#F5F3F1",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                            }}
                            whileTap={{ 
                              scale: 0.98
                            }}
                            transition={{ 
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                              duration: 0.15
                            }}
                          >
                            <Edit2 className="w-4 h-4 text-[#464646]" />
                            <span className="text-[14px] text-[#464646]">Edit</span>
                          </motion.button>
                          <motion.button 
                            type="button" 
                            onClick={() => handleDelete(provider.id)} 
                            className="flex-1 h-9 bg-[#FDFCFB] border border-[#E4E1DD] rounded-[4px] flex items-center justify-center gap-2" 
                            aria-label="Delete"
                            whileHover={{ 
                              scale: 1.02,
                              backgroundColor: "rgba(220, 38, 38, 0.1)",
                              borderColor: "rgba(220, 38, 38, 0.3)",
                              boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)"
                            }}
                            whileTap={{ 
                              scale: 0.98
                            }}
                            transition={{ 
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                              duration: 0.15
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-[#464646]" />
                            <span className="text-[14px] text-[#464646]">Delete</span>
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <DesktopFooter />

          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
        </div>
      </section>
    </main>
  );
}

