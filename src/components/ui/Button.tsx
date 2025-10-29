import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-[16px] font-semibold h-11 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-[#03121F]/10 disabled:opacity-60 disabled:cursor-not-allowed";
    const variants = {
      primary:
        "bg-[#09B558] text-[#FBF9F7] border border-[#03121F]/20 hover:bg-[#0aae55]",
      secondary:
        "bg-[#FDFCFB] text-[#03121F] border border-[#03121F]/20 hover:bg-[#f6f4f2]",
    } as const;
    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />
    );
  }
);
Button.displayName = "Button";
