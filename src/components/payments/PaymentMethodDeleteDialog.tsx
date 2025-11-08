"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

type PaymentMethodDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function PaymentMethodDeleteDialog({ open, onClose, onConfirm }: PaymentMethodDeleteDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[390px] mx-4 bg-[#FDFCFB] rounded-[8px] border border-[#E4E1DD] shadow-[0_4px_4px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-4"
          >
            <h2 className="text-[21px] leading-[32px] font-semibold text-black">Remove Payment Method</h2>
            <p className="text-[15px] leading-[22px] text-[#464646]">
              Are you sure you want to remove this payment method? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" onClick={onConfirm} className="flex-1">
                Remove
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

