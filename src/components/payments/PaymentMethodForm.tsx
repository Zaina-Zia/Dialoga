"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { PaymentMethod } from "../../types";

type PaymentMethodFormProps = {
  paymentMethod?: PaymentMethod;
  onSubmit: (paymentMethod: Omit<PaymentMethod, "id">) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

const detectCardType = (cardNumber: string): PaymentMethod["cardType"] => {
  const cleaned = cardNumber.replace(/\s/g, "");
  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  return "other";
};

const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "");
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(" ").slice(0, 19);
};

const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
};

export function PaymentMethodForm({ paymentMethod, onSubmit, onCancel, isSubmitting = false }: PaymentMethodFormProps) {
  const [cardNumber, setCardNumber] = useState(paymentMethod?.cardNumber || "");
  const [expiry, setExpiry] = useState(
    paymentMethod ? `${paymentMethod.expiryMonth}/${paymentMethod.expiryYear}` : ""
  );
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState(paymentMethod?.cardholderName || "");
  const [billingAddress, setBillingAddress] = useState(paymentMethod?.billingAddress || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
      newErrors.cardNumber = "Card number must be 13-19 digits";
    }
    if (!expiry || !expiry.includes("/")) {
      newErrors.expiry = "Expiry date is required (MM/YY)";
    }
    if (!cvv || cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = "CVV must be 3-4 digits";
    }
    if (!cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const [expiryMonth, expiryYear] = expiry.split("/");
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    const last4 = cleanedCardNumber.slice(-4);

    onSubmit({
      cardNumber: last4,
      expiryMonth: expiryMonth || "",
      expiryYear: expiryYear || "",
      cardholderName: cardholderName.trim(),
      cardType: detectCardType(cleanedCardNumber),
      billingAddress: billingAddress.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Card Number *</label>
        <Input
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
        {errors.cardNumber && <div className="text-[12px] leading-[18px] text-red-600">{errors.cardNumber}</div>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-[15px] leading-[22px] font-medium text-black">Expiry *</label>
          <Input
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            maxLength={5}
          />
          {errors.expiry && <div className="text-[12px] leading-[18px] text-red-600">{errors.expiry}</div>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[15px] leading-[22px] font-medium text-black">CVV *</label>
          <Input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123"
            maxLength={4}
          />
          {errors.cvv && <div className="text-[12px] leading-[18px] text-red-600">{errors.cvv}</div>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Cardholder Name *</label>
        <Input
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="John Doe"
        />
        {errors.cardholderName && <div className="text-[12px] leading-[18px] text-red-600">{errors.cardholderName}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Billing Address</label>
        <textarea
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          placeholder="123 Main St, City, State, ZIP"
          rows={3}
          className="h-auto w-full rounded-md border border-[#03121F]/20 bg-[#FDFCFB] px-3 py-2 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : paymentMethod ? "Update" : "Add"} Payment Method
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1" disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

