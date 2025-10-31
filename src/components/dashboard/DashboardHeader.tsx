"use client";
import { useRouter } from "next/navigation";

export function DashboardHeader({ hideBack = false }: { hideBack?: boolean }) {
  const router = useRouter();
  return (
    <header className="w-full grid place-items-center">
      {/* Outer container 390 width, ~88.19 height */}
      <div className="w-full max-w-[390px] h-[88.19px] flex flex-col">
        {/* Inner frame (Frame 11) */}
        <div className="w-[390px] h-[81px] px-4 py-2 flex items-center justify-between gap-[46px]">
          {/* Back button (Disclosure) 20x20, optionally hidden per Figma */}
          {hideBack ? (
            <div className="w-[20px] h-[20px]" />
          ) : (
            <button
              type="button"
              aria-label="Back"
              onClick={() => router.back()}
              className="w-[20px] h-[20px] inline-flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 6L8 12L14 18" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <img src="/images/Logo_bg_removed.png" alt="Dialoga" width={232} height={65} className="w-[232px] h-[65px] object-contain" />
          <div className="w-[20px] h-[20px]" />
        </div>
        {/* Line 1 */}
        <div className="w-[390px] mt-2 border-t border-black" />
      </div>
    </header>
  );
}

