"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AdminPanelDialoga from "../../../components/admin/AdminPanelDialoga";
import { LogoutOverlay } from "../../../components/overlays/LogoutOverlay";

export default function AdminPanelDialogaPage() {
  const router = useRouter();
  const [openLogout, setOpenLogout] = React.useState(false);
  return (
    <>
      <AdminPanelDialoga
        onNotify={() => {
          router.push("/notification");
        }}
        onLogout={() => setOpenLogout(true)}
      />
      <LogoutOverlay open={openLogout} onClose={() => setOpenLogout(false)} onConfirm={() => router.push("/login")} />
    </>
  );
}
