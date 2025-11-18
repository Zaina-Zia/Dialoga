"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function DashboardHeader({ hideBack = false }: { hideBack?: boolean }) {
  const router = useRouter();
  return (
    <header className="w-full flex flex-col items-center">
      {/* Outer container */}
      <div className="w-full max-w-[390px] h-auto flex flex-col">
        {/* Inner frame with centered logo; back button positioned independently */}
        <div className="relative w-full h-[81px] px-4 pt-1 pb-2 flex items-center justify-center">
          {/* Back button */}
          {!hideBack && (
            <motion.button
              type="button"
              aria-label="Back"
              onClick={() => router.back()}
              className="w-[20px] h-[20px] inline-flex items-center justify-center absolute left-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 6L8 12L14 18"
                  stroke="#464646"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          )}
          <img
            src="/images/Logo_bg_removed.svg"
            alt="Dialoga"
            width={232}
            height={65}
            className="w-[232px] h-[65px] object-contain"
            style={{ imageRendering: "crisp-edges" }}
          />
        </div>
      </div>

      {/* Full-width divider */}
      <div className="w-screen border-t border-black" />
    </header>
  );
}
