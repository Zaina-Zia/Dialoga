import React from 'react';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, UserCog } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.button
          type="button"
          onClick={handleNotify}
          className="flex flex-col items-center gap-[2px] mx-auto px-2 py-1 rounded-md transition-colors"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "rgba(0, 0, 0, 0.05)"
          }}
          whileTap={{ 
            scale: 0.95,
            backgroundColor: "rgba(0, 0, 0, 0.1)"
          }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 17,
            duration: 0.15
          }}
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Bell className="h-[28px] w-[28px] text-neutral-700" />
          </motion.div>
          <span className="h-[15px] text-[10px] leading-[15px] font-medium text-black text-center">
            Notification
          </span>
        </motion.button>

        {/* Logout */}
        <motion.button
          type="button"
          onClick={handleLogout}
          className="flex flex-col items-center gap-[2px] mx-auto px-2 py-1 rounded-md transition-colors"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "rgba(0, 0, 0, 0.05)"
          }}
          whileTap={{ 
            scale: 0.95,
            backgroundColor: "rgba(0, 0, 0, 0.1)"
          }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 17,
            duration: 0.15
          }}
        >
          <motion.div
            whileHover={{ rotate: [0, 10, -10, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <LogOut className="h-[28px] w-[28px] text-neutral-700" />
          </motion.div>
          <span className="h-[12px] text-[10px] leading-[15px] font-medium text-black text-center">
            Logout
          </span>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
