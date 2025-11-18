"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { AuthCard } from "../../../components/auth/AuthCard";
import { AuthForm } from "../../../components/auth/AuthForm";
import { AuthError } from "../../../components/auth/AuthError";
import { ERROR_MESSAGES } from "../../../constants/errors";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [emailError, setEmailError] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setEmailError("");
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const emailPattern = /.+@.+\..+/;
    if (!email) {
      setEmailError(ERROR_MESSAGES.requiredEmail);
      return;
    }
    if (!emailPattern.test(email)) {
      setEmailError(ERROR_MESSAGES.invalidEmail);
      return;
    }
    // Mock success: navigate to Reset Password
    router.push("/reset-password");
  };
  return (
    <main className="min-h-dvh w-full grid place-items-center">
      {/* Mobile artboard 390x844 paddings and 32px gap */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh flex flex-col items-center bg-[#F5F3F1] pt-8 px-4 pb-[107px] gap-8">
        {/* Header 390x36 with back chevron */}
        <header className="w-full h-[36px] px-2 sm:px-4 py-2 flex items-center">
          <Link href="/login" aria-label="Back to Sign in" className="w-[20px] h-[20px] inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#03121F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </header>

        {/* Card 358x316 with 24px vertical padding and 16px gap */}
        <AuthCard className="w-full max-w-[358px] min-h-[316px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] pt-6 pb-6 px-4 flex flex-col items-center gap-6">
          {/* Brand logo */}
          <img src="/images/logo.jpg" alt="Dialoga" width={214} height={56} className="w-[214px] h-[56px] object-contain" />

          {/* Heading (334x32, Poppins 600, 21px) */}
          <h1 className="w-full text-[21px] leading-[27px] font-semibold text-black text-center sm:text-left">
            Forgot your password
          </h1>

          {/* Email input (332x45) */}
          <AuthForm noValidate onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3">
            <label htmlFor="email" className="w-full max-w-[332px] text-[18px] leading-[18px] font-medium text-black text-left">Email</label>
            <Input id="email" name="email" type="email" className="w-full max-w-[332px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
            {emailError && <AuthError message={emailError} />}

            {/* Continue CTA (332x45) */}
            <Button type="submit" className="mt-6 w-full max-w-[332px] h-[45px] rounded-[8px] border border-[#03121F33] bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
              Continue
            </Button>
          </AuthForm>
        </AuthCard>
      </section>

      {/* Desktop layout (lg and up): header bar + centered card per Figma */}
      <section className="hidden lg:flex w-full min-h-dvh flex-col items-center bg-[#F5F3F1]">
        {/* Header 97px with back chevron left, centered logo */}
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

        {/* Centered card region (responsive top offset to avoid cut-off when zoomed) */}
        <div className="w-full flex items-start justify-center mt-[clamp(32px,10vh,135px)] pb-8">
          {/* Outer card 436x398 with 32 padding */}
          <AuthCard className="w-full max-w-[436px] h-[398.2857px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] p-8 flex items-center justify-center">
            {/* Inner card 372x334 with 32/16 paddings */}
            <AuthCard className="w-full max-w-[372px] h-[334.2857px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] pt-8 pb-8 px-4 flex flex-col items-center gap-4">
              {/* Content stack 340 wide */}
              <div className="w-full max-w-[340px] flex flex-col items-center gap-4">
                <img src="/images/logo.jpg" alt="Dialoga" width={214} height={57} className="w-[214px] h-[57px] object-contain" />
                <h1 className="w-[340px] h-[32px] text-[21px] leading-[21px] font-semibold text-black">Forgot Your Password</h1>

                <AuthForm noValidate onSubmit={handleSubmit} className="w-full max-w-[340px] flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="d-email" className="text-[18px] leading-[18px] font-medium text-black">Email</label>
                    <Input id="d-email" name="email" type="email" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                    {emailError && <AuthError message={emailError} />}
                  </div>

                  <Button type="submit" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]">Continue</Button>
                </AuthForm>
              </div>
            </AuthCard>
          </AuthCard>
        </div>
      </section>
    </main>
  );
}

