"use client";
import React from "react";
import { CreditCard, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentMethod } from "../../types";

type PaymentMethodCardProps = {
  paymentMethod: PaymentMethod;
  onEdit: () => void;
  onDelete: () => void;
};

export function PaymentMethodCard({ paymentMethod, onEdit, onDelete }: PaymentMethodCardProps) {
  const getCardIcon = () => {
    switch (paymentMethod.cardType) {
      case "visa":
        return "💳";
      case "mastercard":
        return "💳";
      case "amex":
        return "💳";
      default:
        return "💳";
    }
  };

  return (
    <motion.div 
      className="w-full bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] p-3"
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 17,
        duration: 0.15
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[#F5F3F1] rounded-[4px] flex items-center justify-center text-[20px]">
            {getCardIcon()}
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[15px] leading-[22px] font-medium text-black">
              •••• •••• •••• {paymentMethod.cardNumber.slice(-4)}
            </div>
            <div className="text-[12px] leading-[18px] text-[#464646]">
              {paymentMethod.expiryMonth}/{paymentMethod.expiryYear} • {paymentMethod.cardholderName}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onEdit}
            className="p-2 rounded-[4px] transition-colors"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(0, 0, 0, 0.05)"
            }}
            whileTap={{ 
              scale: 0.95,
              backgroundColor: "rgba(0, 0, 0, 0.1)"
            }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 17,
              duration: 0.15
            }}
            aria-label="Edit"
          >
            <Edit className="w-4 h-4 text-[#464646]" />
          </motion.button>
          <motion.button
            type="button"
            onClick={onDelete}
            className="p-2 rounded-[4px] transition-colors"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(220, 38, 38, 0.1)"
            }}
            whileTap={{ 
              scale: 0.95,
              backgroundColor: "rgba(220, 38, 38, 0.2)"
            }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 17,
              duration: 0.15
            }}
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4 text-[#464646]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

