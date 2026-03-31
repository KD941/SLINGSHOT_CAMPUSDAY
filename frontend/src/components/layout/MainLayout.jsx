import { Outlet, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, CalendarDays, Timer, Zap } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Home',     icon: LayoutDashboard },
  { to: '/analysis',  label: 'Analysis', icon: Activity },
  { to: '/calendar',  label: 'Calendar', icon: CalendarDays },
  { to: '/fasting',   label: 'Fasting',  icon: Timer },
  { to: '/pulse',     label: 'Pulse',    icon: Zap },
];

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#f5f7f9', maxWidth: 480, margin: '0 auto' }}>
      {/* Main scrollable content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Tab Bar */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center bg-white/80 backdrop-blur-xl border-t z-50"
        style={{
          width: '100%',
          maxWidth: 480,
          borderColor: 'rgba(171,173,175,0.3)',
        }}
      >
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="flex-1"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-0.5 py-2 relative">
                {isActive && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-x-2 inset-y-1 rounded-full"
                    style={{ background: '#eef1f3' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  style={{ color: isActive ? '#006947' : '#747779', zIndex: 1, position: 'relative' }}
                />
                <span
                  className="text-[10px] font-medium relative z-10"
                  style={{ color: isActive ? '#006947' : '#747779' }}
                >
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
