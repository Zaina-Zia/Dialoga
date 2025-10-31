"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, PlusCircle, Camera, Mic } from "lucide-react";

export default function ChatViewPage() {
  const router = useRouter();
  const [showPlus, setShowPlus] = React.useState(false);
  const [showPicker, setShowPicker] = React.useState(false);
  const [recording, setRecording] = React.useState(false);

  return (
    <main className="min-h-dvh w-full grid place-items-center">
      {/* Container 390x841, bg, pt-8, gap-5 */}
      <section className="w-full max-w-[390px] min-h-[841px] bg-[#F5F3F1] flex flex-col items-center pt-8 gap-4">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-[390px] h-[74px] flex flex-col items-center justify-end gap-3"
        >
          {/* Top row 45px: back + name group */}
          <div className="w-[390px] h-[45px] flex flex-row flex-wrap items-center justify-center gap-x-[151px] gap-y-4 isolate relative">
            <button
              type="button"
              aria-label="Back"
              onClick={() => router.back()}
              className="h-5 w-5 inline-flex items-center justify-center absolute left-4"
            >
              <ChevronLeft className="h-5 w-5 text-black/85" />
            </button>

            {/* Customer group */}
            <div className="flex flex-row items-center gap-2">
              <div className="h-[45px] w-[45px] rounded-full grid place-items-center" style={{ background: "rgba(9, 181, 88, 0.25)" }}>
                <img
                  src="/images/Dashboard_Home/accountCircle.png"
                  alt="avatar"
                  className="h-[41px] w-[41px] object-contain"
                />
              </div>
              <span className="text-[21px] leading-[25px] font-semibold text-black" style={{ fontFamily: "Inter, Poppins, sans-serif" }}>
                Name of Customer
              </span>
            </div>
          </div>
          {/* Divider */}
          <div className="w-[390px] border-t border-black" />
        </motion.header>

        {/* Chat body */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-[392px] flex flex-col items-center gap-6 flex-1"
        >
          <div className="flex flex-col items-center gap-4 w-[280px] h-[134px]">
            {/* Date bubble */}
            <div className="min-w-[165px] h-[23px] px-[43px] py-[2px] bg-[#D9D9D9] rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.05)] grid place-items-center">
              <span className="text-[15px] leading-[22px] font-medium text-[#464646]">Today</span>
            </div>

            {/* Message bubble */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.05 }}
              className="relative w-[280px] h-[95px] shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
            >
              <div className="absolute inset-0 bg-[#D9D9D9] rounded-[8px]" />
              <div className="absolute left-[9px] top-[14px] w-[262px] h-[61px] grid place-items-center">
                <p className="text-[15px] leading-[22px] font-normal text-[#464646] text-center">
                  Esta persona está interesada en mesa de madera
                </p>
              </div>
            </motion.div>

            {/* Typing indicator placeholder (hidden by default) */}
            <div className="sr-only" aria-hidden>
              typing...
            </div>
          </div>
        </motion.section>

        {/* Footer input bar */}
        <motion.footer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative w-[392px] h-[36px] bg-[#464646] flex items-center gap-2 px-3"
        >
          <div className="relative">
            <button
              type="button"
              aria-label="Add"
              onClick={() => setShowPlus((v) => !v)}
              className="h-5 w-5 grid place-items-center text-[#E3E3E3] active:scale-95 transition-transform"
            >
              <PlusCircle className="h-5 w-5" />
            </button>
            {showPlus && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute bottom-8 left-0 z-40"
              >
                <div className="w-[200px] rounded-[10px] bg-white shadow-md border border-black/10 overflow-hidden">
                  {["Send image", "Send file", "Share location"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setShowPlus(false)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-stone-100 active:bg-stone-200"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          {/* Real input so mobile keyboard shows */}
          <input
            type="text"
            placeholder="Message"
            className="w-[264px] h-[21px] bg-[#D9D9D9] rounded-[10px] px-3 text-[14px] text-[#03121F] placeholder-[#03121F]/60 outline-none"
          />
          <button
            type="button"
            aria-label="Camera"
            onClick={() => setShowPicker(true)}
            className="h-5 w-5 grid place-items-center text-[#E3E3E3] active:scale-95 transition-transform"
          >
            <Camera className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Mic"
            onClick={() => {
              setRecording(true);
              setTimeout(() => setRecording(false), 2000);
            }}
            className="h-5 w-5 grid place-items-center text-[#E3E3E3] active:scale-95 transition-transform"
          >
            <Mic className="h-5 w-5" />
          </button>
        </motion.footer>

        {/* Plus dropdown moved to be anchored above + button (inside footer) */}

        {/* Mock image picker */}
        {showPicker && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={() => setShowPicker(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[340px] rounded-[12px] bg-[#FDFCFB] border border-[#E4E1DD] p-4 shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[18px] font-semibold">Select image</h3>
                <button className="text-black/70" onClick={() => setShowPicker(false)}>✕</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="h-20 rounded bg-stone-200 grid place-items-center text-stone-500 text-sm">{`Img ${i}`}</div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Recording indicator */}
        {recording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 px-3 py-1 rounded-full bg-black/80 text-white text-sm"
          >
            Recording…
          </motion.div>
        )}
      </section>
    </main>
  );
}
