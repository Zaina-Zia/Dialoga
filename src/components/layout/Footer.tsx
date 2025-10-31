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
    <footer className="w-full grid place-items-center">
      {/* Constrain to 390 and keep total height ~62px */}
      <div className="w-full max-w-[390px]">
        {/* Line 1 */}
        <div className="w-full border-t border-black" />
        {/* Frame 7 */}
        <div className="w-full h-[45px] px-[42px] mt-4 mb-4 flex items-start justify-between gap-[32px]">
          {showAdmin && (
            <div className="flex flex-col items-center gap-[2px] mx-auto">
              <UserCog className="h-[28px] w-[28px] text-neutral-700" />
              <span className="h-[12px] text-[10px] leading-[15px] font-medium text-black text-center">Admin</span>
            </div>
          )}
          {/* Notification */}
          <button
            type="button"
            onClick={handleNotify}
            className="flex flex-col items-center gap-[2px] mx-auto"
          >
            <Bell className="h-[28px] w-[28px] text-neutral-700" />
            <span className="h-[15px] text-[10px] leading-[15px] font-medium text-black text-center">Notification</span>
          </button>
          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex flex-col items-center gap-[2px] mx-auto"
          >
            <LogOut className="h-[28px] w-[28px] text-neutral-700" />
            <span className="h-[12px] text-[10px] leading-[15px] font-medium text-black text-center">Logout</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
