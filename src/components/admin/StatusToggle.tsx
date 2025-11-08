"use client";
import React from "react";

type StatusToggleProps = {
  status: "active" | "paused";
  onChange: (status: "active" | "paused") => void;
};

export function StatusToggle({ status, onChange }: StatusToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(status === "active" ? "paused" : "active")}
      className={`w-[60px] h-[24px] rounded-full relative transition ${
        status === "active" ? "bg-[#09B558]" : "bg-[#464646]"
      }`}
      aria-label={`Status: ${status}`}
    >
      <div
        className={`absolute top-[2px] left-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform ${
          status === "active" ? "translate-x-[36px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}

