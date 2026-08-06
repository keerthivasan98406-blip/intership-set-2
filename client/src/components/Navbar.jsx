import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import {
  Sun,
  Moon,
  LogOut,
  CheckCircle2,
  Menu,
  X,
  Plus,
  User,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onOpenCreateModal, toggleMobileSidebar, isMobileSidebarOpen }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left section: Logo & Mobile menu toggle */}
          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <button
                onClick={toggleMobileSidebar}
                className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}

            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
                <CheckCircle2 size={24} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-600 dark:from-white dark:via-indigo-200 dark:to-indigo-400 bg-clip-text text-transparent">
                  TaskFlow<span className="text-indigo-500">Pro</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-500/90 dark:text-indigo-400 flex items-center gap-1">
                  <Sparkles size={10} /> Realtime Sync
                </span>
              </div>
            </Link>
          </div>

          {/* Right section: Action button, theme toggle & user profile */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {isAuthenticated && onOpenCreateModal && (
              <button
                onClick={onOpenCreateModal}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium shadow-lg shadow-indigo-500/25 active:scale-95 transition-all text-sm"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">New Task</span>
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors focus:outline-none"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-slate-700 hover:text-indigo-600 transition-colors" />
              ) : (
                <Sun size={20} className="text-amber-400 hover:text-amber-300 transition-colors" />
              )}
            </button>

            {/* Authenticated User Actions */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
                    {user?.name?.charAt(0).toUpperCase() || <User size={16} />}
                  </div>
                  <span className="hidden md:inline font-medium text-sm text-slate-700 dark:text-slate-200">
                    {user?.name}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
