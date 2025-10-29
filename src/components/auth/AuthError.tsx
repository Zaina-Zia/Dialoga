import * as React from "react";

export function AuthError({ message }: { message: string }) {
  return (
    <p className="text-[13px] leading-[16px] text-red-600 mt-1">
      {message}
    </p>
  );
}
