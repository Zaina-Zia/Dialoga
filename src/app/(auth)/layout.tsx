export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Minimal wrapper so individual pages fully control spacing and layout.
  return <>{children}</>;
}
