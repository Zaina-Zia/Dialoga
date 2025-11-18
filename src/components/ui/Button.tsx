import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type MotionButtonProps = HTMLMotionProps<"button">;

export type ButtonProps = MotionButtonProps & {
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

    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragExit,
      onDragLeave,
      onDragOver,
      onDrop,
      ...restProps
    } = props as any;

    return (
      <motion.button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}
        whileTap={{ 
          scale: 0.98,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 17,
          duration: 0.15
        }}
        {...restProps}
      />
    );
  }
);
Button.displayName = "Button";
