import * as React from "react";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

/**
 * AuthHeader
 * Title/subtitle wrapper. Animation (Framer Motion) can be added later.
 */
export function AuthHeader({ title, subtitle, className = "" }: Props) {
  return (
    <header className={`flex flex-col ${className}`}>
      <h1 className="text-[21px] leading-[21px] font-semibold text-black">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 text-[14px] leading-[18px] text-[#03121F]/70">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
