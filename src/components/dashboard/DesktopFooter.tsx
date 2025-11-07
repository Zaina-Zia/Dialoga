"use client";
import React from "react";

export default function DesktopFooter() {
  return (
    <footer className="hidden lg:flex w-full flex-col">
      {/* Full-bleed divider */}
      <div className="w-screen border-t border-black" />
      <div className="w-full max-w-[1512px] mx-auto px-[60px] py-3">
        <div className="text-[15px] leading-[22px] font-medium text-black">
          Contact Us ・ Privacy Policy ・ Other item
        </div>
      </div>
    </footer>
  );
}
