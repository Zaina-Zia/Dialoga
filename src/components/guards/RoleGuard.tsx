"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSuperAdmin } from "../../lib/auth";

/**
 * RoleGuard component to block Super Admin from accessing regular user pages
 * Super Admin should ONLY have access to admin panel management section
 */
export function RoleGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (isSuperAdmin()) {
      // Redirect Super Admin to admin panel page
      router.replace("/admin-panel-page");
    }
  }, [router]);

  // If Super Admin, don't render children (will redirect)
  if (isSuperAdmin()) {
    return null;
  }

  return <>{children}</>;
}



