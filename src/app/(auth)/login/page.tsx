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
import { getRedirectPath } from "../../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? data.get("d-email") ?? "").trim();
    const password = String(data.get("password") ?? data.get("d-password") ?? "").trim();

    let hasError = false;
    // simple email regex; can be replaced with stricter validation later
    const emailPattern = /.+@.+\..+/;
    if (!email) {
      setEmailError(ERROR_MESSAGES.requiredEmail);
      hasError = true;
    } else if (!emailPattern.test(email)) {
      setEmailError(ERROR_MESSAGES.invalidEmail);
      hasError = true;
    }

    if (!password) {
      setPasswordError(ERROR_MESSAGES.requiredPassword);
      hasError = true;
    }

    if (hasError) return;

    // Persist credentials and desired redirect then navigate to verify-email
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_email", email);
        localStorage.setItem("auth_password", password);
        const redirect = getRedirectPath(email, password);
        localStorage.setItem("post_login_redirect", redirect);
      }
    } catch {}

    router.push("/verify-email");
  };
  return (
    <main className="min-h-dvh w-full">
      {/* Mobile layout (default) */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh bg-[#F5F3F1] rounded-none pt-[103px] pb-[107px] px-4 sm:px-6 flex flex-col items-center gap-8 mx-auto">
        {/* Inner card to control spacing */}
        <AuthCard className="w-full max-w-[364px] h-[380px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] pt-6 pb-6 px-4 flex flex-col items-center gap-4">
          <div className="flex flex-col gap-4 items-center w-full">
            {/* Brand logo (fixed 214x56) */}
            <img src="/images/logo.jpg" alt="Dialoga" width={214} height={56} className="w-[214px] h-[56px] object-contain" />

            {/* Form with constrained widths */}
            <AuthForm noValidate onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
              {/* Frame 11: Email + Password + Forgot (px-12, gap 31) */}
              <div className="w-full flex flex-col items-center gap-4">
                {/* Email group (332x72, px 1) */}
                <div className="w-full max-w-[332px] flex flex-col gap-1 items-start">
                  <label htmlFor="email" className="w-full text-[18px] leading-[27px] font-medium text-black">Email</label>
                  <Input id="email" name="email" type="email" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                  {emailError && <AuthError message={emailError} />} 
                </div>

                {/* Password group (332x72, pl 1) */}
                <div className="w-full max-w-[332px] flex flex-col gap-1 items-start">
                  <label htmlFor="password" className="w-full text-[18px] leading-[27px] font-medium text-black">Contraseña</label>
                  <Input id="password" name="password" type="password" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                  {passwordError && <AuthError message={passwordError} />}
                </div>

                {/* Forgot link (w 332 x h 23, 15/22) */}
                <Link href="/forgot-password" className="block w-full max-w-[332px] text-right text-[15px] leading-[22px] font-normal text-black underline">Forgot your password?</Link>
              </div>

              {/* CTA Frame: 340x45 with px 57 and drop-shadow */}
              <div className="w-full flex flex-col items-center gap-[10px] mt-[10px]">
                <div className="w-full max-w-[340px] h-[45px]" style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.05))" }}>
                  <Button type="submit" className="w-full h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[27px] flex items-center justify-center px-[40px]">Log In</Button>
                </div>
              </div>
            </AuthForm>
          </div>
        </AuthCard>
      </section>

      {/* Desktop layout (lg and up): 50/50 split per Figma */}
      <section className="hidden lg:grid w-full h-dvh grid-cols-2">
        {/* Left column: green pane exactly 50% width with centered 451x451 box */}
        <div className="bg-[#09B558] h-full flex items-center justify-center">
          
            <img src="/images/DesktopLogo.png" alt="Dialoga" width={451} height={451} className="max-w-[90%] max-h-[90%] object-contain" />
          
        </div>

        {/* Right column: 404x469 outer with 32/16 padding; inner 372x405 with 32/16 padding */}
        <div className="flex items-center justify-center h-full bg-[#FBF9F7]">
          <AuthCard className="w-full max-w-[404px] h-[469.2857px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] p-8 flex items-start justify-center">
            <AuthCard className="w-full max-w-[372px] h-[405.2857px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] pt-8 pb-8 px-4 flex flex-col items-center gap-4">
              {/* Content width 340 */}
              <div className="w-full max-w-[340px] h-[341.2857px] flex flex-col items-center gap-3">
                <img src="/images/logo.jpg" alt="Dialoga" width={214} height={57} className="w-[214px] h-[57px] object-contain" />
                {/* Form area with slightly tighter row-gap */}
                <form noValidate onSubmit={handleSubmit} className="w-full max-w-[340px] flex flex-col gap-[18px]">
                  <div className="w-full flex flex-col gap-[14px]">
                    <label htmlFor="d-email" className="w-[241.66px] h-[28.29px] text-[18px] leading-[27px] font-medium text-black">Email</label>
                    <Input id="d-email" name="d-email" type="email" className="w-full h-[45px] rounded-[8px] border border-[#03121F33] bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)]" />
                  </div>
                  <div className="w-full flex flex-col gap-[14px]">
                    <label htmlFor="d-password" className="w-[301.9px] h-[28px] text-[18px] leading-[27px] font-medium text-black">Contraseña</label>
                    <Input id="d-password" name="d-password" type="password" className="w-full h-[45px] rounded-[8px] border border-[#03121F33] bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)]" />
                  </div>
                  <Link href="/forgot-password" className="block w-full text-right text-[15px] leading-[22px] font-normal text-black underline">Forgot your password?</Link>
                  <Button type="submit" className="w-full h-[45px] rounded-[8px] border border-[#03121F33] bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[27px] flex items-center justify-center">Log In</Button>
                </form>
              </div>
            </AuthCard>
          </AuthCard>
        </div>
      </section>
    </main>
  );
}

