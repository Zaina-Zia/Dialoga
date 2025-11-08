"use client";
import React from "react";

export default function DesktopFooter() {
  return (
    <footer className="hidden lg:flex w-full flex-col items-center">
      {/* Full-bleed divider */}
      <div className="w-full border-t border-black" />
      <div className="w-full flex justify-center">
        <div className="w-[1512px] px-[60px] py-3">
          <div className="text-[15px] leading-[22px] font-medium text-black">
            Contact Us ・ Privacy Policy ・ Other item
          </div>
        </div>
      </div>
    </footer>
  );
}
