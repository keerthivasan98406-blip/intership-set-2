import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { User, Mail, Calendar, LogOut, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const Profile = () => {
  const { user, logout } = useAuth();
  const { stats } = useTasks();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Profile Card */}
      <div className="glass-card rounded-3xl p-8 border border-white/50 dark:border-slate-800/80 relative overflow-hidden text-center sm:text-left">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-xl shadow-indigo-500/25 border-4 border-white/20">
            {user?.name?.charAt(0).toUpperCase() || <User size={40} />}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {user?.name}
              </h1>
              <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-500" title="Active User">
                <ShieldCheck size={18} />
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail size={15} /> {user?.email}
            </p>
            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Calendar size={13} /> Member since {formatDate(user?.createdAt || new Date())}
            </p>
          </div>
        </div>
      </div>

      {/* Task Summary Metrics */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/50 dark:border-slate-800/80">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-indigo-500" /> User Performance Stats
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/10">
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {stats.total}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Total Tasks</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/10">
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              {stats.pending}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Pending</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/10">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {stats.completed}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Completed</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/10">
            <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              {Math.round((stats.completed / (stats.total || 1)) * 100)}%
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Account Settings / Actions */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/50 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">Account Security</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Signed in securely via JWT token</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-md transition-colors"
        >
          <LogOut size={18} />
          <span>Logout Account</span>
        </button>
      </div>

    </div>
  );
};

export default Profile;
