"use client";
import React from "react";
import { X, ChevronRight, MessageSquare, History, Clock } from "lucide-react";
import { mockNotifications, type NotificationItem } from "../../constants/mockNotifications";

export type NotificationOverlayProps = {
  open: boolean;
  onClose: () => void;
  items?: NotificationItem[];
};

export const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ open, onClose, items }) => {
  if (!open) return null;
  const list = items ?? mockNotifications;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center px-4">
      <div className="relative w-full max-w-[334px] rounded-[12px] bg-[#FDFCFB] border border-[#E4E1DD] p-4 shadow-md">
        <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 h-6 w-6 grid place-items-center text-black/70">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-[21px] leading-[25px] font-semibold text-black mb-2">Notifications</h2>
        <div className="flex flex-col divide-y divide-[#E4E1DD]">
          {list.map((it: NotificationItem, i: number) => (
            <button key={i} type="button" className="w-full py-3 flex items-center justify-between text-left active:opacity-90">
              <div className="flex items-center gap-3">
                <div className="h-[28px] w-[28px] grid place-items-center text-[#09B558]">
                  {it.type === "history" ? (
                    <History className="h-[20px] w-[20px]" />
                  ) : (
                    <MessageSquare className="h-[20px] w-[20px]" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] leading-[22px] font-medium text-black">{it.title}</span>
                  <div className="flex items-center gap-1 text-[10px] leading-[15px] text-black/50">
                    <Clock className="h-[12px] w-[12px]" />
                    <span>{it.time}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#464646]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
