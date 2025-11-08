"use client";
import React from "react";
import { CreditCard, Edit, Trash2 } from "lucide-react";
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
    <div className="w-full bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] p-3">
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
          <button
            type="button"
            onClick={onEdit}
            className="p-2 hover:bg-[#F5F3F1] rounded-[4px] transition"
            aria-label="Edit"
          >
            <Edit className="w-4 h-4 text-[#464646]" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-2 hover:bg-[#F5F3F1] rounded-[4px] transition"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4 text-[#464646]" />
          </button>
        </div>
      </div>
    </div>
  );
}

