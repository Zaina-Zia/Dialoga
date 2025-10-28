export default function LoginPage() {
  return (
    <main className="min-h-dvh w-full grid place-items-center">
      {/* Mobile layout (default) */}
      <section className="lg:hidden w-full max-w-[390px] min-h-dvh bg-[#F5F3F1] border border-[#03121F]/20 rounded-none pt-[103px] pr-4 pb-[107px] pl-4 flex flex-col items-center gap-8 mx-auto">
        {/* Inner card to control spacing */}
        <div className="w-full max-w-[364px] min-h-[380px] bg-[#FDFCFB] border border-[#E4E1DD] rounded-[8px] py-6">
          <div className="flex flex-col gap-4 items-center">
            {/* Brand logo (fixed 214x56) */}
            <img src="/images/logo.jpg" alt="Dialoga" width={214} height={56} className="w-[214px] h-[56px] object-contain" />

            {/* Form with constrained widths */}
            <form className="w-full flex flex-col gap-4 items-center">
              <div className="w-full flex flex-col gap-2 items-center">
                <label htmlFor="email" className="w-full max-w-[330px] text-[18px] leading-[18px] font-medium text-black">Correo electrónico</label>
                <input id="email" type="email" className="w-[330px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
              </div>

              <div className="w-full flex flex-col gap-2 items-center">
                <label htmlFor="password" className="w-[330px] text-[18px] leading-[18px] font-medium text-black">Contraseña</label>
                <input id="password" type="password" className="w-[330px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
              </div>

              <a href="/forgot-password" className="block w-full max-w-[332px] h-[23px] text-right text-[15px] leading-[15px] font-normal text-black underline">¿Olvidaste tu contraseña?</a>

              <button type="submit" className="w-full max-w-[340px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center px-[57px] py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </section>

      {/* Desktop layout (lg and up): fixed 756px green panel + centered card */}
      <section className="hidden lg:grid w-full min-h-dvh grid-cols-[756px_1fr]">
        {/* Left column: fixed 756x auto height, with white box positioned */}
        <div className="relative bg-[#09B558] min-h-dvh flex items-center justify-center">
          {/* Centered white box 451x451 */}
          <div className="w-[451px] h-[451px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
            <img src="/images/DesktopLogo.png" alt="Dialoga" width={451} height={451} className="max-w-[90%] max-h-[90%] object-contain" />
          </div>
        </div>

        {/* Right column: center the card regardless of screen/zoom */}
        <div className="flex items-center justify-center min-h-dvh">
          {/* Outer frame */}
          <div className="w-[404px] h-[469.2857px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] pt-8 pr-4 pb-8 pl-4 flex flex-col items-center gap-4">
            {/* Inner frame */}
            <div className="w-[372px] h-[405.2857px] bg-[#FBF9F7] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] pt-8 pr-4 pb-8 pl-4 flex flex-col items-center gap-4">
              {/* Shared form (desktop widths 340) */}
              <form className="w-[340px] flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="d-email" className="text-[18px] leading-[18px] font-medium text-black">Correo electrónico</label>
                  <input id="d-email" type="email" className="w-[340px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="d-password" className="text-[18px] leading-[18px] font-medium text-black">Contraseña</label>
                  <input id="d-password" type="password" className="w-[340px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10" />
                </div>

                <a href="/forgot-password" className="block w-[340px] h-[18px] text-right text-[15px] leading-[15px] font-normal text-black underline">¿Olvidaste tu contraseña?</a>

                <button type="submit" className="w-[340px] h-[45px] rounded-[8px] border border-[#03121F]/20 bg-[#09B558] text-[#FBF9F7] text-[18px] font-semibold leading-[18px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.05)]">Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

