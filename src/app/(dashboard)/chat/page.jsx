"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DesktopHeader from "../../../components/dashboard/DesktopHeader";
import ChatViewHeader from "../../../components/chat/ChatViewHeader";
import { NotificationOverlay } from "../../../components/notifications/NotificationOverlay";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";
import { MessageBubble } from "../../../components/chat/MessageBubble";
import { TypingIndicator } from "../../../components/chat/TypingIndicator";
import { RoleGuard } from "../../../components/guards/RoleGuard";
import { Plus, Search, Paperclip, Camera, Mic, Send } from "lucide-react";

const contacts = [
  { name: "Name of Customer", preview: "Abbreviated message here", time: "13:45" },
  { name: "Name of Customer", preview: "Abbreviated message here", time: "Yesterday" },
  { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 28" },
  { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 27" },
  { name: "Name of Customer", preview: "Abbreviated message here", time: "Sep 27" },
];

const getMessages = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(`chat_messages_0`);
  return stored ? JSON.parse(stored) : [
    {
      id: "1",
      text: "Esta persona está interesada en mesa de madera",
      timestamp: "13:45",
      sender: "customer",
    },
  ];
};

const saveMessages = (contactId, messages) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(`chat_messages_${contactId}`, JSON.stringify(messages));
};

export default function ChatViewPage() {
  const router = useRouter();
  const [attachments, setAttachments] = useState([]);
  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    setMessages(getMessages());
  }, [selectedContactIndex]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      sender: "user",
    };
    const updated = [...messages, newMessage];
    setMessages(updated);
    saveMessages(selectedContactIndex, updated);
    setInputText("");
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: (Date.now() + 1).toString(),
        text: "Gracias por tu mensaje. Te responderé pronto.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        sender: "customer",
      };
      const updatedWithReply = [...updated, reply];
      setMessages(updatedWithReply);
      saveMessages(selectedContactIndex, updatedWithReply);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddImage = () => setAttachments((prev) => [...prev, "Imagen"]);
  const handleRecord = () => setAttachments((prev) => [...prev, "Nota de voz"]);

  return (
    <RoleGuard>
      <main className="w-full bg-[#F5F3F1]">
      {/* Mobile layout (fixed header, only messages scroll) */}
      <section className="lg:hidden w-full h-screen max-h-screen flex flex-col overflow-hidden bg-[#F5F3F1]">
        {/* Fixed Header */}
        <div className="flex-none w-full bg-[#F5F3F1]">
        <ChatViewHeader name={selectedContact.name} />
        </div>

        {/* Messages area - Only this scrolls */}
        <div className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden flex flex-col gap-3 px-4 py-4 bg-[#F5F3F1]">
          <div className="flex justify-center items-center w-[165px] h-[23px] bg-[#D9D9D9] shadow-[0_4px_4px_rgba(0,0,0,0.05)] rounded-[10px] mx-auto mb-2 flex-none">
              <span className="text-[#464646] text-[15px] leading-[22px] font-medium font-[Poppins]">Today</span>
          </div>
          {messages.map((msg, index) => (
            <MessageBubble key={msg.id} message={msg} index={index} />
          ))}
          <TypingIndicator isTyping={isTyping} />
          {attachments.length > 0 && (
            <div className="w-full flex flex-col items-center gap-1 mb-2 flex-none">
              {attachments.map((item, index) => (
                <span key={index} className="text-[12px] text-[#464646]">
                  Added: {item}
                </span>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} className="flex-none" />
        </div>

        {/* Fixed Input Area */}
        <div className="flex-none w-full h-[40px] bg-[#464646] flex items-center px-4 gap-2">
          <button type="button" onClick={handleAddImage} className="h-6 w-6 grid place-items-center flex-none" aria-label="Add">
              <Plus className="h-6 w-6 text-[#E3E3E3]" />
            </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 min-w-0 h-[23px] bg-[#D9D9D9] rounded-[10px] px-3 text-[15px] leading-[22px] text-[#464646] outline-none placeholder-[#464646]/50"
          />
          <button type="button" onClick={handleSend} disabled={!inputText.trim()} className="h-6 w-6 grid place-items-center flex-none disabled:opacity-50" aria-label="Send">
            <Send className="h-5 w-5 text-[#E3E3E3]" />
          </button>
          <button type="button" className="h-6 w-6 grid place-items-center flex-none" aria-label="Attach">
              <Paperclip className="h-5 w-5 text-[#E3E3E3]" />
            </button>
          <button type="button" className="h-6 w-6 grid place-items-center flex-none" aria-label="Camera">
              <Camera className="h-5 w-5 text-[#E3E3E3]" />
            </button>
          <button type="button" onClick={handleRecord} className="h-6 w-6 grid place-items-center flex-none" aria-label="Record">
              <Mic className="h-5 w-5 text-[#E3E3E3]" />
            </button>
        </div>
      </section>

      {/* Desktop layout (fixed header, fixed sidebar, only messages scroll) */}
      <section className="hidden lg:flex w-full h-screen flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="flex-none">
          <DesktopHeader
            onNotify={() => setShowNotifications(true)}
            onLogout={() => setShowLogout(true)}
          />
        </div>

        {/* Main Content Area - Fixed height, no scroll */}
        <div className="flex-1 min-h-0 flex border-t border-black bg-[#FBF9F7] overflow-hidden">
          {/* Contact list (382px) - Fixed */}
          <aside className="w-[382px] bg-[#F5F3F1] border-r border-[#E4E1DD] flex flex-col overflow-hidden">
              <div className="relative h-full w-[382px] bg-[#FBF9F7] border border-[#E4E1DD] pt-6 pb-3 px-3 flex flex-col gap-[11px]">
              {/* HEADER (Frame 23) - Fixed */}
              <div className="w-full flex items-center justify-between flex-none">
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

              {/* MESSAGE AREA (contact list) - Scrollable */}
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-0 min-h-0">
                  {filtered.map((contact, index) => (
                    <button
                      key={`${contact.name}-${index}`}
                      type="button"
                      onClick={() => setSelectedContactIndex(index)}
                    className={`h-[45px] w-full rounded-[0px] bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)] px-[10px] flex items-center gap-[10px] transition flex-none ${
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
              </div>
            </aside>

          {/* Conversation column - Fixed height, flex column */}
          <div className="flex-1 flex justify-center min-w-0 overflow-hidden">
            <div className="w-full max-w-[1130px] h-full bg-[#FDFCFB] flex flex-col overflow-hidden">
              {/* HEADER - Fixed */}
              <div className="flex flex-col items-center gap-4 pt-4 pb-2 flex-none">
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
              </div>

              {/* MESSAGE AREA - Only this scrolls */}
              <div className="flex-1 min-h-0 w-full overflow-y-auto flex flex-col gap-3 px-4 py-2">
                <div className="flex justify-center items-center h-[23px] px-[43px] bg-[#D9D9D9] shadow-[0_4px_4px_rgba(0,0,0,0.05)] rounded-[10px] mx-auto mb-2">
                    <span className="text-[#464646] text-[15px] leading-[22px] font-medium">Today</span>
                </div>
                {messages.map((msg, index) => (
                  <MessageBubble key={msg.id} message={msg} index={index} />
                ))}
                <TypingIndicator isTyping={isTyping} />
                <div ref={messagesEndRef} />
                </div>

              {/* COMPOSER - Fixed at bottom */}
              <div className="w-full flex-none border-t border-[#E4E1DD]">
                  <div className="w-full h-[56px] bg-[#464646] flex items-center gap-3 px-4">
                    <button type="button" onClick={() => setAttachments((p) => [...p, "Imagen"])} className="h-6 w-6 grid place-items-center" aria-label="Add">
                      <Plus className="h-6 w-6 text-[#E3E3E3]" />
                    </button>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 h-[24px] bg-[#D9D9D9] rounded-[10px] px-3 text-[15px] leading-[22px] text-[#464646] outline-none placeholder-[#464646]/50"
                  />
                  <button type="button" onClick={handleSend} disabled={!inputText.trim()} className="h-6 w-6 grid place-items-center disabled:opacity-50" aria-label="Send">
                    <Send className="h-5 w-5 text-[#E3E3E3]" />
                  </button>
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

        {/* Overlays */}
          <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
          <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
      </section>

      {/* Overlays */}
      <NotificationOverlay open={showNotifications} onClose={() => setShowNotifications(false)} />
      <LogoutOverlay open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => router.push("/login")} />
    </main>
    </RoleGuard>
  );
}