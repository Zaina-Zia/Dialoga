import * as React from "react";

export type AuthCardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * AuthCard
 * Shared card wrapper. Defaults to consistent shadow/padding, but any className
 * passed in will override to preserve exact Figma sizing on each page.
 */
export function AuthCard({ className = "", ...props }: AuthCardProps) {
  const base =
    "rounded-2xl bg-white p-8 shadow-lg border border-[#E4E1DD]";
  return <div className={`${base} ${className}`} {...props} />;
}
