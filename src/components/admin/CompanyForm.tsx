"use client";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Company } from "../../types";

type CompanyFormProps = {
  company?: Company;
  onSubmit: (company: Omit<Company, "id">) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function CompanyForm({ company, onSubmit, onCancel, isSubmitting = false }: CompanyFormProps) {
  const [name, setName] = useState(company?.name || "");
  const [user, setUser] = useState(company?.user || "");
  const [phone, setPhone] = useState(company?.phone || "");
  const [token, setToken] = useState(company?.token || "");
  const [status, setStatus] = useState<"active" | "paused">(company?.status || "active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateToken = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const token = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setToken(token);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Company name is required";
    if (!user.trim()) newErrors.user = "User email is required";
    else if (!/.+@.+\..+/.test(user)) newErrors.user = "Invalid email format";
    if (!token.trim()) newErrors.token = "API token is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: name.trim(),
      user: user.trim(),
      phone: phone.trim(),
      token: token.trim(),
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Company Name *</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Company name"
        />
        {errors.name && <div className="text-[12px] leading-[18px] text-red-600">{errors.name}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">User Email *</label>
        <Input
          type="email"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="user@example.com"
        />
        {errors.user && <div className="text-[12px] leading-[18px] text-red-600">{errors.user}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Phone</label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="000-000-0000"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">API Token *</label>
        <div className="flex gap-2">
          <Input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="API token"
          />
          <Button type="button" variant="secondary" onClick={generateToken} className="whitespace-nowrap">
            Generate
          </Button>
        </div>
        {errors.token && <div className="text-[12px] leading-[18px] text-red-600">{errors.token}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[15px] leading-[22px] font-medium text-black">Status</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStatus("active")}
            className={`flex-1 h-11 rounded-md border text-[16px] font-medium transition ${
              status === "active"
                ? "bg-[#09B558] text-white border-[#09B558]"
                : "bg-[#FDFCFB] text-[#464646] border-[#03121F]/20"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setStatus("paused")}
            className={`flex-1 h-11 rounded-md border text-[16px] font-medium transition ${
              status === "paused"
                ? "bg-[#464646] text-white border-[#464646]"
                : "bg-[#FDFCFB] text-[#464646] border-[#03121F]/20"
            }`}
          >
            Paused
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : company ? "Update" : "Create"} Company
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1" disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

