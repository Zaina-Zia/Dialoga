import React from 'react';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, UserCog } from 'lucide-react';

export type FooterProps = {
  onNotify?: () => void;
  onLogout?: () => void;
  showAdmin?: boolean;
};

const Footer: React.FC<FooterProps> = ({ onNotify, onLogout, showAdmin = false }) => {
  const router = useRouter();
  const handleNotify = () => (onNotify ? onNotify() : router.push('/notification'));
  const handleLogout = () => (onLogout ? onLogout() : router.push('/login'));

  return (
    <footer className="w-full flex flex-col items-center">
      {/* Full-width line */}
      <div className="w-screen border-t border-black" />

      {/* Footer content (constrained to 390px) */}
      <div className="w-full max-w-[390px] h-[62px] flex items-center justify-between px-[42px] mt-4 mb-4 gap-[32px]">
        {showAdmin && (
          <div className="flex flex-col items-center gap-[2px] mx-auto">
            <UserCog className="h-[28px] w-[28px] text-neutral-700" />
            <span className="h-[12px] text-[10px] leading-[15px] font-medium text-black text-center">
              Admin
            </span>
          </div>
        )}

        {/* Notification */}
        <button
          type="button"
          onClick={handleNotify}
          className="flex flex-col items-center gap-[2px] mx-auto"
        >
          <Bell className="h-[28px] w-[28px] text-neutral-700" />
          <span className="h-[15px] text-[10px] leading-[15px] font-medium text-black text-center">
            Notification
          </span>
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-col items-center gap-[2px] mx-auto"
        >
          <LogOut className="h-[28px] w-[28px] text-neutral-700" />
          <span className="h-[12px] text-[10px] leading-[15px] font-medium text-black text-center">
            Logout
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
