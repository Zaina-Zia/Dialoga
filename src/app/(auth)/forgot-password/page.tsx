import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-dvh w-full grid place-items-center">
      {/* Outer frame (fluid, max 390) */}
      <section className="w-full max-w-[390px] min-h-dvh bg-[#F5F3F1] border border-[#03121F]/20 rounded-none pt-[103px] pr-4 pb-[107px] pl-4 flex flex-col items-center gap-8 mx-auto">
        {/* Clickable header image (390x36) that goes to Login */}
        <Link href="/login" aria-label="Volver a iniciar sesión" className="w-full h-[36px] block">
          <img src="/images/header.png" alt="Header" className="w-full h-full object-cover" />
        </Link>

        {/* Inner content box */}
        <div className="w-full max-w-[358px] min-h-[316px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] py-6 px-3 flex flex-col items-center gap-8">
          {/* Brand logo */}
          <img src="/images/logo.jpg" alt="Dialoga" width={214} height={56} className="w-[214px] h-[56px] object-contain" />

          {/* Heading (334x32, Poppins 600, 21px) */}
          <h1 className="w-[334px] h-[32px] text-[21px] leading-[21px] font-semibold text-black">
            ¿Olvidaste tu contraseña?
          </h1>

          {/* Email input (332x45) */}
          <div className="w-full flex flex-col items-center gap-2">
            <label htmlFor="email" className="w-[332px] text-[18px] leading-[18px] font-medium text-black">Correo electrónico</label>
            <input id="email" type="email" className="w-[332px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
          </div>

          {/* Continue CTA (332x45) */}
          <button type="submit" className="w-[332px] h-[45px] rounded-[8px] border border-[#03121F33] bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
            Continuar
          </button>
        </div>
      </section>
    </main>
  );
}

