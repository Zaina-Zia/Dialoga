"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DesktopHeader from "../../../components/dashboard/DesktopHeader";
import ChatViewHeader from "../../../components/chat/ChatViewHeader";
import Footer from "../../../components/layout/Footer";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";
import { Plus, Search, Paperclip, Camera, Mic } from "lucide-react";

const contacts = [
  { name: "Name of Customer", preview: "Abbreviated message here", time: "13:45" },
  { name: "Name of Customer", preview: "Abbreviated message here", time: "Yesterday" },
  { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 28" },
  { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 27" },
  { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 27" },
];

const primaryMessage = "Esta persona está interesada en mesa de madera";

export default function ChatViewPage() {
  const router = useRouter();
  const [attachments, setAttachments] = useState([]);
  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(0);

  const selectedContact = contacts[selectedContactIndex];
  const filtered = contacts.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      (c.preview ?? "").toLowerCase().includes(q) ||
      (c.time ?? "").toLowerCase().includes(q)
    );
  });

  const handleAddImage = () => setAttachments((prev) => [...prev, "Imagen"]);
  const handleRecord = () => setAttachments((prev) => [...prev, "Nota de voz"]);

  return (
    <main className="min-h-screen w-full bg-[#F5F3F1]">
      {/* Mobile layout (unchanged) */}
      <section className="lg:hidden mx-auto w-full max-w-[390px] min-h-[844px] flex flex-col items-center gap-5 py-8">
        <ChatViewHeader name={selectedContact.name} />

        <div className="flex flex-col items-center justify-between w-[390px] h-[715px]">
          <div className="flex flex-col items-center gap-[16px] w-[280px] h-[134px]">
            <div className="flex justify-center items-center w-[165px] h-[23px] bg-[#D9D9D9] shadow-[0_4px_4px_rgba(0,0,0,0.05)] rounded-[10px]">
              <span className="text-[#464646] text-[15px] leading-[22px] font-medium font-[Poppins]">Today</span>
            </div>
            <div className="relative w-[280px] h-[95px] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
              <div className="absolute inset-0 rounded-[8px] bg-[#D9D9D9]" />
              <p className="absolute left-[9px] right-[9px] top-[16px] text-[15px] leading-[22px] text-[#464646] text-center font-[Poppins]">
                {primaryMessage}
              </p>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="w-full flex flex-col items-center gap-1 mb-4">
              {attachments.map((item, index) => (
                <span key={index} className="text-sm text-[#464646]">
                  Added: {item}
                </span>
              ))}
            </div>
          )}

          <div className="w-[390px] h-[40px] bg-[#464646] flex items-center px-4 gap-2">
            <button type="button" onClick={handleAddImage} className="h-6 w-6 grid place-items-center" aria-label="Add">
              <Plus className="h-6 w-6 text-[#E3E3E3]" />
            </button>
            <div className="flex-1 h-[23px] bg-[#D9D9D9] rounded-[10px]" />
            <button type="button" className="h-6 w-6 grid place-items-center" aria-label="Attach">
              <Paperclip className="h-5 w-5 text-[#E3E3E3]" />
            </button>
            <button type="button" className="h-6 w-6 grid place-items-center" aria-label="Camera">
              <Camera className="h-5 w-5 text-[#E3E3E3]" />
            </button>
            <button type="button" onClick={handleRecord} className="h-6 w-6 grid place-items-center" aria-label="Record">
              <Mic className="h-5 w-5 text-[#E3E3E3]" />
            </button>
          </div>
        </div>

        <div className="w-[390px] mt-auto">
          <Footer onNotify={() => setShowNotifications(true)} onLogout={() => setShowLogout(true)} />
        </div>
      </section>

      {/* Desktop layout (fixed composer + scrollable message area, no edge gaps) */}
      <section className="hidden lg:flex w-full min-h-screen justify-center items-stretch">
        <div className="w-full max-w-[1512px] flex flex-col flex-1 min-h-0 gap-0 pt-0 pb-0">
          <DesktopHeader
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
          />

          {/* Outer frame: full-bleed, no side borders to avoid box look; rely on header line + inner divider */}
          <div className="flex w-screen flex-1 min-h-0 border-t border-black bg-[#FBF9F7] overflow-hidden">
            {/* Contact list (382px) */}
            <aside className="w-[382px] bg-[#F5F3F1] border-r border-[#E4E1DD] flex justify-end">
              {/* Frame 67 (p-6 top ==24px, px-3 ==12px, pb-3 ==12px) */}
              <div className="relative h-full w-[382px] bg-[#FBF9F7] border border-[#E4E1DD] pt-6 pb-3 px-3 flex flex-col gap-[11px]">
                {/* HEADER (Frame 23) */}
                <div className="w-full flex items-center justify-between">
                  {/* Search (358x24) */}
                  <div className="relative h-[24px] w-full bg-[#D9D9D9] rounded-[10px] mt-8">
                    <Search className="absolute left-[10px] top-1/2 -translate-y-1/2 h-5 w-5 text-[#464646]" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      className="w-full h-full rounded-[10px] bg-transparent outline-none pl-[36px] pr-2 text-[15px] leading-[22px] text-[#464646] placeholder-[#464646]"
                    />
                  </div>
                </div>
                {/* Floating plus (Vector 45x45) */}
                <button
                  type="button"
                  aria-label="New chat"
                  className="absolute top-0 right-3 z-10 h-[45px] w-[45px] rounded-full bg-[#09B558] grid place-items-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
                  onClick={() => setAttachments((p) => [...p, "Image"])}
                >
                  <Plus className="h-6 w-6 text-white" />
                </button>

                {/* MESSAGE AREA (contact list) */}
                <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-0">
                  {filtered.map((contact, index) => (
                    <button
                      key={`${contact.name}-${index}`}
                      type="button"
                      onClick={() => setSelectedContactIndex(index)}
                      className={`h-[45px] w-full rounded-[0px] bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)] px-[10px] flex items-center gap-[10px] transition ${
                        selectedContactIndex === index ? "ring-1 ring-[#09B558]/60" : ""
                      }`}
                    >
                      <div
                        className="h-[45px] w-[45px] rounded-full overflow-hidden grid place-items-center"
                        style={{ background: "rgba(9, 181, 88, 0.25)" }}
                      >
                        <img
                          src="/images/Dashboard_Home/accountCircle.png"
                          alt="avatar"
                          className="h-[41px] w-[41px] object-contain"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between gap-[9px]">
                          <span className="text-[15px] leading-[22px] font-medium text-black">
                            {contact.name}
                          </span>
                          <span className="text-[10px] leading-[15px] text-black/50">{contact.time}</span>
                        </div>
                        <span className="text-[10px] leading-[15px] text-black/50">{contact.preview}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {/* (No COMPOSER in the contact list column) */}
              </div>
            </aside>

            {/* Conversation column */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[1130px] h-full bg-[#FDFCFB] flex flex-col px-0 pt-6 pb-0">
                {/* HEADER */}
                <div className="flex flex-col items-center gap-4 pt-4 flex-none">
                  <div className="flex items-center gap-2">
                    <div className="h-[45px] w-[45px] grid place-items-center">
                      <div
                        className="h-[36px] w-[36px] rounded-full"
                        style={{ background: "rgba(9, 181, 88, 0.25)" }}
                      />
                    </div>
                    <span className="text-[21px] leading-[25px] font-semibold text-black">
                      {selectedContact.name}
                    </span>
                  </div>
                  <div className="flex justify-center items-center h-[23px] px-[43px] bg-[#D9D9D9] shadow-[0_4px_4px_rgba(0,0,0,0.05)] rounded-[10px]">
                    <span className="text-[#464646] text-[15px] leading-[22px] font-medium">Today</span>
                  </div>
                </div>

                {/* MESSAGE AREA */}
                <div className="flex-1 min-h-0 w-full overflow-y-auto flex flex-col items-center gap-4 mt-4">
                  {/* Example message bubble */}
                  <div className="relative w-[280px] h-[95px] filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                    <div className="absolute inset-0 rounded-[8px] bg-[#D9D9D9]" />
                    <p className="absolute left-[9px] right-[9px] top-[16px] text-[15px] leading-[22px] text-[#464646] text-center">
                      {primaryMessage}
                    </p>
                  </div>

                  {attachments.length > 0 && (
                    <div className="flex flex-col items-center gap-1">
                      {attachments.map((item, index) => (
                        <span key={`${item}-${index}`} className="text-sm text-[#464646]">
                          Added: {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* COMPOSER */}
                <div className="w-full flex-none">
                  <div className="w-full h-[56px] bg-[#464646] flex items-center gap-3 px-4">
                    <button type="button" onClick={() => setAttachments((p) => [...p, "Imagen"])} className="h-6 w-6 grid place-items-center" aria-label="Add">
                      <Plus className="h-6 w-6 text-[#E3E3E3]" />
                    </button>
                    <div className="flex-1 h-[24px] bg-[#D9D9D9] rounded-[10px]" />
                    <button type="button" className="h-6 w-6 grid place-items-center" aria-label="Attach">
                      <Paperclip className="h-5 w-5 text-[#E3E3E3]" />
                    </button>
                    <button type="button" className="h-6 w-6 grid place-items-center" aria-label="Camera">
                      <Camera className="h-5 w-5 text-[#E3E3E3]" />
                    </button>
                    <button type="button" onClick={() => setAttachments((p) => [...p, "Nota de voz"])} className="h-6 w-6 grid place-items-center" aria-label="Record">
                      <Mic className="h-5 w-5 text-[#E3E3E3]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlays (unchanged) */}
          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
        </div>
      </section>
    </main>
  );
}