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
    try {
      const target =
        (typeof window !== "undefined" && localStorage.getItem("post_login_redirect")) || "/dashboard";
      router.push(target);
    } catch {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-dvh w-full bg-[#F5F3F1]">
      {/* Mobile-first layout - responsive from smallest screens */}
      <section className="w-full min-h-dvh flex flex-col items-center bg-[#F5F3F1] pt-4 sm:pt-8 px-3 sm:px-4 pb-8 sm:pb-[107px] gap-4 sm:gap-8 lg:hidden">
        {/* Header - responsive padding */}
        <header className="w-full max-w-[390px] h-auto min-h-[36px] px-2 sm:px-4 py-2 flex items-center">
          <Link href="/login" aria-label="Back to Login" className="w-[20px] h-[20px] inline-flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#03121F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </header>

        {/* Main content card - responsive width */}
        <div className="w-full max-w-[390px] flex flex-col items-center gap-4 sm:gap-6">
          <AuthCard className="w-full max-w-[366px] min-h-[358px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] pt-6 pb-6 px-3 sm:px-4 flex flex-col items-center gap-4 sm:gap-6">
            {/* Logo - responsive sizing */}
            <img
              src="/images/logo.jpg"
              alt="Dialoga"
              width={214}
              height={56}
              className="w-full max-w-[214px] h-auto object-contain"
            />

            {/* Title */}
            <div className="w-full -mt-1">
              <h1 className="w-full text-[21px] leading-[26px] font-semibold text-black text-center">Verify Your Email</h1>
            </div>

            {/* Form - responsive width */}
            <form noValidate onSubmit={handleSubmit} className="w-full flex flex-col gap-6 sm:gap-8">
              <div className="w-full flex flex-col gap-2 sm:gap-3">
                <p className="w-full text-[18px] leading-[22px] font-medium text-black">
                  Enter the 6-digit verification code
                </p>
                {/* OTP Input - now responsive */}
                <div className="w-full flex justify-center">
                  <OtpInput value={code} onChange={setCode} />
                </div>
                {/* Resend link */}
                <div className="w-full flex items-center justify-end">
                  <Link href="#" className="text-[15px] leading-[22px] underline text-black">Resend SMS code</Link>
                </div>
              </div>

              {/* Continue button */}
              <div className="w-full flex flex-col gap-1">
                <Button
                  type="submit"
                  className="w-full h-[45px] rounded-[8px] border border-[#03121F33] bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center"
                  disabled={code.length !== 6}
                >
                  Continue
                </Button>
              </div>
            </form>
          </AuthCard>
        </div>
      </section>

      {/* Desktop layout (lg and up): header + divider + centered card */}
      <section className="hidden lg:flex w-full min-h-dvh flex-col items-center bg-[#F5F3F1]">
        {/* Header */}
        <div className="w-full h-[97px] px-4 flex items-center justify-between">
          <Link href="/login" aria-label="Back" className="w-[20px] h-[20px] inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#03121F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <img 
            src="/images/Logo_bg_removed.svg" 
            alt="Dialoga" 
            width={232} 
            height={65} 
            className="w-[232px] h-[65px] object-contain"
            style={{ imageRendering: "crisp-edges" }}
          />
          <div className="w-[28px] h-[28px]" />
        </div>
        {/* Divider line */}
        <div className="w-full border-t border-black" />

        {/* Centered card region */}
        <div className="w-full flex items-start justify-center mt-[clamp(32px,12vh,234px)] pb-8">
          <AuthCard className="w-full max-w-[366px] min-h-[358px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] py-8 px-6 flex flex-col items-center gap-4">
            <AuthCard className="w-full max-w-[366px] min-h-[358px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] pt-8 pb-8 px-4 flex flex-col items-center gap-4">
              <div className="w-full max-w-[340px] flex flex-col items-center gap-4">
                <img 
                  src="/images/logo.jpg" 
                  alt="Dialoga" 
                  width={214} 
                  height={57} 
                  className="w-[214px] h-[57px] object-contain"
                  style={{ imageRendering: "crisp-edges" }}
                />
                <div className="w-full max-w-[340px]">
                  <h1 className="w-full text-[21px] leading-[27px] font-semibold text-black text-center">Verify Your Email</h1>
                </div>
                <form noValidate onSubmit={handleSubmit} className="w-full max-w-[340px] flex flex-col gap-6">
                  <div className="w-full flex flex-col gap-4">
                    <p className="w-full text-[18px] leading-[27px] font-medium text-black">Enter the 6-digit verification code</p>
                    <div className="w-full flex items-center justify-center">
                      <OtpInput value={code} onChange={setCode} />
                    </div>
                    <div className="w-full flex items-center justify-end">
                      <Link href="#" className="text-[15px] leading-[22px] underline text-black">Resend SMS code</Link>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-[45px] rounded-[8px] border border-[#03121F33] bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
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
