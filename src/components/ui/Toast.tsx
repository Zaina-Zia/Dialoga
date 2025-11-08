"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
};

export function Toast({ message, type = "success", isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-[8px] border border-[#E4E1DD] bg-[#FDFCFB] px-4 py-3 shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
        >
          <div className={`flex items-center gap-2 ${type === "success" ? "text-[#09B558]" : "text-red-600"}`}>
            <CheckCircle className="h-5 w-5" />
            <span className="text-[15px] leading-[22px] font-medium text-black">{message}</span>
          </div>
          <button
            onClick={onClose}
            className="ml-2 h-5 w-5 flex items-center justify-center text-[#464646] hover:text-black transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

