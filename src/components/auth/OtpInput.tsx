"use client";
import * as React from "react";

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (next: string) => void;
  className?: string;
};

export function OtpInput({ length = 6, value, onChange, className = "" }: OtpInputProps) {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const values = Array.from({ length }, (_, i) => value[i] ?? "");

  const setValueAt = (index: number, char: string) => {
    const chars = value.split("");
    chars[index] = char;
    const next = chars.join("").padEnd(length, "").slice(0, length);
    onChange(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const input = e.currentTarget;
    const v = input.value.replace(/\D/g, "");
    if (!v) {
      setValueAt(idx, "");
      return;
    }
    setValueAt(idx, v[0]);
    if (v.length > 1) {
      let next = value.split("");
      next[idx] = v[0];
      let i = idx + 1;
      let j = 1;
      while (i < length && j < v.length) {
        next[i] = v[j];
        i++;
        j++;
      }
      onChange(next.join("").padEnd(length, "").slice(0, length));
      if (inputsRef.current[Math.min(length - 1, idx + v.length)]) {
        inputsRef.current[Math.min(length - 1, idx + v.length)]?.focus();
      }
      return;
    }
    if (inputsRef.current[idx + 1]) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      e.preventDefault();
      inputsRef.current[idx - 1]?.focus();
      setValueAt(idx - 1, "");
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    let next = value.split("");
    let i = idx;
    let j = 0;
    while (i < length && j < text.length) {
      next[i] = text[j];
      i++;
      j++;
    }
    onChange(next.join("").padEnd(length, "").slice(0, length));
    inputsRef.current[Math.min(length - 1, idx + text.length - 1)]?.focus();
  };

  return (
    <div className={`w-full max-w-[340px] h-[50px] flex items-center justify-between gap-2 ${className}`}>
      {values.map((ch, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={ch}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={(e) => handlePaste(e, idx)}
          className="flex-1 min-w-0 h-[50px] rounded-[8px] border border-[#03121F33] bg-[#FDFCFB] shadow-[0_4px_4px_rgba(0,0,0,0.05)] text-center text-[18px] font-medium text-[#03121F] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10"
        />
      ))}
    </div>
  );
}
