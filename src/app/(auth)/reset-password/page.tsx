"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "../../../components/auth/AuthCard";
import { AuthForm } from "../../../components/auth/AuthForm";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { AuthError } from "../../../components/auth/AuthError";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmError("");

    const data = new FormData(e.currentTarget);
    const password = String(data.get("password") ?? "").trim();
    const confirm = String(data.get("confirm") ?? "").trim();

    let hasError = false;
    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }
    if (!confirm) {
      setConfirmError("Please confirm your new password.");
      hasError = true;
    } else if (password && confirm !== password) {
      setConfirmError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;
    // Mock success: go back to Login
    router.push("/login");
  };

  return (
    <main className="min-h-dvh w-full grid place-items-center">
      {/* Mobile artboard 390x844 paddings and 32px gap */}
      <section className="lg:hidden w-full max-w-[390px] min-h-[844px] flex flex-col items-center bg-[#F5F3F1] pt-8 px-4 pb-[107px] gap-8">
        {/* Header 390x36 with 8/16 paddings and back chevron */}
        <header className="w-full h-[36px] px-4 py-2 flex items-center">
          <Link href="/login" aria-label="Back" className="w-[20px] h-[20px] inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#03121F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </header>

        {/* Card Frame 38: 364x380 with 24px vertical padding and 16px gap */}
        <AuthCard className="w-full max-w-[358px] min-h-[389px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] pt-6 pb-6 px-4 flex flex-col items-center gap-4">
          {/* Logo 214x56 */}
          <img src="/images/Logo_bg_removed.svg" alt="Dialoga" width={214} height={56} className="w-[214px] h-[56px] object-contain" />

          {/* Title */}
          <div className="w-full">
            <h1 className="text-[21px] leading-[32px] font-semibold text-black text-center sm:text-left">Reset Password</h1>
          </div>

          {/* Frame 33: 364x260 with 32 gap (wrap all fields + CTA in one form) */}
          <AuthForm noValidate onSubmit={handleSubmit} className="w-full max-w-[358px] flex flex-col items-center gap-6">
            {/* Frame 11: 358x269, border-x/bottom, px-3, gap 16 */}
            <div className="w-full flex flex-col items-center gap-4 border-x border-[#E4E1DD] px-3 pb-4">
              {/* Fields container 334px */}
              <div className="w-full max-w-[334px] flex flex-col gap-4">
                {/* Field 1 */}
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="password" className="w-full h-[27px] text-[18px] leading-[27px] font-medium text-black">Enter Your New Password</label>
                  <Input id="password" name="password" type="password" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                  {passwordError && <AuthError message={passwordError} />}
                </div>

                {/* Field 2 */}
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="confirm" className="w-full h-[27px] text-[18px] leading-[27px] font-medium text-black">Confirm Your New Password</label>
                  <Input id="confirm" name="confirm" type="password" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                  {confirmError && <AuthError message={confirmError} />}
                </div>
              </div>
            </div>

            {/* Bottom CTA bar: Frame 33 364x45 with inner 340x45 button */}
            <div className="w-full px-3">
              <Button type="submit" className="w-full max-w-[334px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[27px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                Continue
              </Button>
            </div>
          </AuthForm>
          
        </AuthCard>
      </section>

      {/* Desktop layout (lg and up): header + divider + centered card per Figma */}
      <section className="hidden lg:flex w-full min-h-dvh flex-col items-center bg-[#F5F3F1]">
        {/* Header 97px with back chevron left, centered logo 232x65 */}
        <div className="w-full h-[97px] px-4 flex items-center justify-between">
          <Link href="/login" aria-label="Back" className="w-[20px] h-[20px] inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#03121F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <img src="/images/Logo_bg_removed.svg" alt="Dialoga" width={232} height={65} className="w-[232px] h-[65px] object-contain" />
          <div className="w-[28px] h-[28px]" />
        </div>
        {/* Divider line */}
        <div className="w-full border-t border-black" />

        {/* Centered card with top gap ~105px (clamped for zoom) */}
        <div className="w-full flex items-start justify-center mt-[clamp(32px,10vh,105px)] pb-8">
          {/* Outer card 436x525 with 32 padding */}
          <AuthCard className="w-full max-w-[436px] h-[525.2857px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] p-8 flex items-center justify-center">
            {/* Inner card 372x461 with 32/16 paddings */}
            <AuthCard className="w-full max-w-[372px] h-[461.2857px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] pt-8 pb-8 px-4 flex flex-col items-center gap-4">
              {/* Content stack width 340 */}
              <div className="w-full max-w-[340px] flex flex-col items-center gap-4">
                <img src="/images/Logo_bg_removed.svg" alt="Dialoga" width={214} height={57} className="w-[214px] h-[57px] object-contain" />
                <div className="w-[340px] h-[32px]">
                  <h1 className="w-[340px] h-[32px] text-[21px] leading-[32px] font-semibold text-black">Reset Password</h1>
                </div>

                {/* Single form wrapping fields + CTA to ensure FormData has inputs */}
                <AuthForm noValidate onSubmit={handleSubmit} className="w-full max-w-[340px] flex flex-col gap-[31px]">
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="d-password" className="w-full text-[18px] leading-[27px] font-medium text-black">Enter Your New Password</label>
                    <Input id="d-password" name="password" type="password" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                    {passwordError && <AuthError message={passwordError} />}
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="d-confirm" className="w-full text-[18px] leading-[27px] font-medium text-black">Confirm Your New Password</label>
                    <Input id="d-confirm" name="confirm" type="password" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                    {confirmError && <AuthError message={confirmError} />}
                  </div>

                  <Button type="submit" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[27px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]">Continue</Button>
                </AuthForm>
              </div>
            </AuthCard>
          </AuthCard>
        </div>
      </section>
    </main>
  );
}
