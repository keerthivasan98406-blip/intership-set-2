import React from 'react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      iconBg: 'bg-indigo-600 text-white shadow-indigo-500/30',
      accent: 'from-indigo-500 to-indigo-600',
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      iconBg: 'bg-amber-500 text-white shadow-amber-500/30',
      accent: 'from-amber-500 to-orange-500',
    },
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      iconBg: 'bg-emerald-600 text-white shadow-emerald-500/30',
      accent: 'from-emerald-500 to-teal-600',
    },
    rose: {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      iconBg: 'bg-rose-500 text-white shadow-rose-500/30',
      accent: 'from-rose-500 to-pink-600',
    },
    sky: {
      bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      iconBg: 'bg-sky-500 text-white shadow-sky-500/30',
      accent: 'from-sky-500 to-blue-600',
    },
  };

  const activeColor = colorMap[color] || colorMap.indigo;

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/40 dark:border-slate-800/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${activeColor.accent}`}></div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            {value}
          </p>
          {trend && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {trend}
            </p>
          )}
        </div>

        <div className={`w-12 h-12 rounded-2xl ${activeColor.iconBg} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
