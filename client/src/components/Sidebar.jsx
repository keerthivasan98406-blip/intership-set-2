import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  CheckCircle,
  User,
  Zap,
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { stats } = useTasks();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'All Tasks',
      path: '/tasks',
      icon: CheckSquare,
      badge: stats?.total || 0,
    },
    {
      name: 'Pending',
      path: '/tasks?status=Pending',
      icon: Clock,
      badge: stats?.pending || 0,
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
    {
      name: 'Completed',
      path: '/tasks?status=Completed',
      icon: CheckCircle,
      badge: stats?.completed || 0,
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-6">
        <div className="px-3 pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navigation
          </p>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-slate-200'
                  }`
                }
                end={item.path === '/'}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center space-x-3">
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? 'text-white'
                            : 'text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'
                        }
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 text-xs font-bold rounded-full border ${
                          isActive
                            ? 'bg-white/20 text-white border-white/30'
                            : item.badgeColor || 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Real-time Indicator Widget */}
      <div className="p-4 rounded-2xl glass-card border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              Socket Active <Zap size={12} className="text-amber-500 fill-amber-500" />
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Live updates enabled
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 glass-sidebar sticky top-16 h-[calc(100vh-4rem)] z-30 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          ></div>
          <aside className="fixed inset-y-0 left-0 w-72 glass-sidebar z-50 shadow-2xl flex flex-col pt-4">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
