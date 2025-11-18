"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Paperclip, Camera, Mic, Send } from "lucide-react";

// Types mirror the existing inline structures in /chat
export type ChatContact = {
  name: string;
  preview?: string;
  time?: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  timestamp: string;
  sender: "user" | "customer";
};

const STORAGE_KEY_PREFIX = "chat_messages_";

const readMessages = (contactId: number): ChatMessage[] => {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(`${STORAGE_KEY_PREFIX}${contactId}`);
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: "1",
          text: "Esta persona está interesada en mesa de madera",
          timestamp: "13:45",
          sender: "customer",
        },
      ];
};

const writeMessages = (contactId: number, messages: ChatMessage[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${STORAGE_KEY_PREFIX}${contactId}`, JSON.stringify(messages));
};

/**
 * Hook that encapsulates the /chat page's conversation behavior.
 * It mirrors the previous state/effect logic without changing behavior.
 */
export function useChatConversation(initialContacts: ChatContact[]) {
  const router = useRouter();
  const [attachments, setAttachments] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [selectedContactIndex, setSelectedContactIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const contacts = initialContacts;
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
    setMessages(readMessages(selectedContactIndex));
  }, [selectedContactIndex]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      sender: "user",
    };
    const updated = [...messages, newMessage];
    setMessages(updated);
    writeMessages(selectedContactIndex, updated);
    setInputText("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Gracias por tu mensaje. Te responderé pronto.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        sender: "customer",
      };
      const updatedWithReply = [...updated, reply];
      setMessages(updatedWithReply);
      writeMessages(selectedContactIndex, updatedWithReply);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddImage = () => setAttachments((prev) => [...prev, "Imagen"]);
  const handleRecord = () => setAttachments((prev) => [...prev, "Nota de voz"]);

  return {
    router,
    contacts,
    filtered,
    selectedContact,
    selectedContactIndex,
    setSelectedContactIndex,
    attachments,
    setAttachments,
    query,
    setQuery,
    messages,
    messagesEndRef,
    inputText,
    setInputText,
    isTyping,
    handleSend,
    handleKeyPress,
    handleAddImage,
    handleRecord,
  };
}
