import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-8 shadow-lg border border-[#E4E1DD] ${className}`}
      {...props}
    />
  );
}
