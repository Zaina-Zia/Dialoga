import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`h-11 w-full rounded-md border border-[#03121F]/20 bg-[#FDFCFB] px-3 text-[16px] text-[#03121F] shadow-[0_4px_4px_rgba(0,0,0,0.05)] outline-none focus:border-[#03121F]/40 focus:ring-2 focus:ring-[#03121F]/10 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
