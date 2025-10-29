"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "../../../components/auth/AuthCard";
import { Button } from "../../../components/ui/Button";
import { OtpInput } from "../../../components/auth/OtpInput";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = React.useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (code.length < 6) return;
    router.push("/dashboard");
  };

  return (
    <main className="min-h-dvh w-full grid place-items-center">
      {/* Mobile artboard 390x812, space-between */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh flex flex-col items-center bg-[#F5F3F1] border border-[#03121F]/20 pt-8 px-4 pb-[107px] gap-8">
        {/* Header 390x36 with 8/16 paddings */}
        <header className="w-[390px] h-[36px] px-4 py-2 flex items-center">
          <Link href="/login" aria-label="Back to Login" className="w-[20px] h-[20px] inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#03121F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </header>

        {/* Dialoga box wrapper with side paddings 12px, sits 32px under header */}
        <div className="w-[390px] min-h-[426px] px-3 flex flex-col items-center gap-4">
          {/* Inner card 366x358 with 24/24 padding and 16px gap, 8px radius, 1px border */}
          <AuthCard className="w-[366px] min-h-[358px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] pt-6 pb-6 px-0 flex flex-col items-center gap-4">
            {/* Logo */}
            <img
              src="/images/logo.jpg"
              alt="Dialoga"
              width={214}
              height={56}
              className="w-[214px] h-[56px] object-contain"
            />

            {/* Title frame 340x32 */}
            <div className="w-[340px] h-[32px] -mt-1">
              <h1 className="w-[340px] h-[32px] text-[21px] leading-[21px] font-semibold text-black">Verify Your Email</h1>
            </div>

            {/* Code area wrapper 340x197 with 32 gap */}
            <form noValidate onSubmit={handleSubmit} className="w-[340px] h-[197px] flex flex-col gap-8">
              {/* Instruction + boxes group 340x120 with 8 gap */}
              <div className="w-[340px] h-[120px] flex flex-col gap-2">
                <p className="w-[340px] h-[27px] text-[18px] leading-[18px] font-medium text-black">
                  Enter the 6-digit verification code
                </p>
                {/* Boxes frame 340x50 with 8 gap */}
                <OtpInput value={code} onChange={setCode} />
                {/* Resend link 340x23, right aligned */}
                <div className="w-[340px] h-[23px] flex items-center justify-end">
                  <Link href="#" className="text-[15px] leading-[15px] underline text-black">Resend SMS code</Link>
                </div>
              </div>

              {/* Buttons frame 340x81 with 4 gap (only one button visible here) */}
              <div className="w-[340px] h-[81px] flex flex-col gap-1">
                <Button
                  type="submit"
                  className="w-[340px] h-[45px] rounded-[8px] border border-[#03121F33] bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center"
                  disabled={code.length !== 6}
                >
                  Continue
                </Button>
              </div>
            </form>
          </AuthCard>
        </div>

        {/* Bottom spacer below content */}
        <div className="h-[216px] w-[390px]" />
      </section>

      {/* Desktop layout (lg and up): header + divider + centered card per Figma */}
      <section className="hidden lg:flex w-full min-h-dvh flex-col items-center bg-[#F5F3F1]">
        {/* Header 97px with back chevron left and centered logo */}
        <div className="w-full h-[97px] px-4 flex items-center justify-between">
          <Link href="/login" aria-label="Back" className="w-[20px] h-[20px] inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#03121F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <img src="/images/Logo_bg_removed.png" alt="Dialoga" width={232} height={65} className="w-[232px] h-[65px] object-contain" />
          <div className="w-[28px] h-[28px]" />
        </div>
        {/* Divider line */}
        <div className="w-full border-t border-black" />

        {/* Centered card region (Figma gap ~234px; clamp for responsiveness) */}
        <div className="w-full flex items-start justify-center mt-[clamp(32px,12vh,234px)] pb-8">
          {/* Outer card 436x400 with 32 padding */}
          <AuthCard className="w-[436px] h-[400px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] p-8 flex items-center justify-center">
            {/* Inner card 372x336 with 32/16 paddings */}
            <AuthCard className="w-[372px] h-[336px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] pt-8 pb-8 px-4 flex flex-col items-center gap-4">
              {/* Content width 340 */}
              <div className="w-[340px] flex flex-col items-center gap-4">
                <img src="/images/logo.jpg" alt="Dialoga" width={214} height={57} className="w-[214px] h-[57px] object-contain" />
                <div className="w-[340px] h-[32px]">
                  <h1 className="w-[340px] h-[32px] text-[21px] leading-[21px] font-semibold text-black">Verify Your Email</h1>
                </div>
                {/* Instructions + OTP + CTA */}
                <form noValidate onSubmit={handleSubmit} className="w-[340px] flex flex-col gap-4">
                  <div className="w-[340px] flex flex-col gap-4">
                    <p className="w-[304px] h-[27px] text-[18px] leading-[27px] font-medium text-black">Enter the 6-digit verification code</p>
                    <div className="w-[340px] h-[50px] flex items-center justify-center">
                      <OtpInput value={code} onChange={setCode} />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-[340px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
                    disabled={code.length !== 6}
                  >
                    Continue
                  </Button>
                </form>
              </div>
            </AuthCard>
          </AuthCard>
        </div>
      </section>
    </main>
  );
}
