export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      {children}
    </main>
  );
}
