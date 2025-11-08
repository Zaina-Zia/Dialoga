"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type LogoutOverlayProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

// Reusable Logout overlay with outer and inner rectangles per Figma
export const LogoutOverlay: React.FC<LogoutOverlayProps> = ({ open, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[334px] rounded-[8px] bg-white p-3 shadow-[0_6px_8px_rgba(0,0,0,0.12)]"
          >
        {/* Inner rectangle */}
        <div className="relative rounded-[8px] bg-[#FDFCFB] border border-[#E4E1DD] p-4">
          <button aria-label="Close" onClick={onClose} className="absolute right-3 top-2 h-6 w-6 grid place-items-center text-black/70">
            <X className="h-5 w-5" />
          </button>
          <div className="mt-4 mb-4 text-center">
            <p className="text-[18px] leading-[27px] font-semibold text-black">Are you sure you want to log out?</p>
          </div>
              <motion.button
            type="button"
            onClick={onConfirm}
                whileTap={{ scale: 0.98 }}
                className="w-full h-[45px] rounded-[8px] bg-[#09B558] text-white text-[18px] font-semibold leading-[27px] grid place-items-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
          >
            Log Out
              </motion.button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
