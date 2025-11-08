"use client";
import React from "react";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { PaymentMethod } from "../../types";

type PaymentMethodListProps = {
  paymentMethods: PaymentMethod[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function PaymentMethodList({ paymentMethods, onEdit, onDelete }: PaymentMethodListProps) {
  if (paymentMethods.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 px-3">
        <div className="text-[15px] leading-[22px] text-[#464646] text-center">
          No payment methods added yet.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {paymentMethods.map((pm) => (
        <PaymentMethodCard
          key={pm.id}
          paymentMethod={pm}
          onEdit={() => onEdit(pm.id)}
          onDelete={() => onDelete(pm.id)}
        />
      ))}
    </div>
  );
}

