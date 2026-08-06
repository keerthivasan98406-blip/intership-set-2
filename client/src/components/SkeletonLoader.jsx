import React from 'react';

const SkeletonLoader = ({ type = 'cards', count = 6 }) => {
  if (type === 'fullPage') {
    return (
      <div className="w-full max-w-4xl p-6 space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-center justify-between">
              <div className="space-y-2 w-full">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-1/3"></div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="glass-card rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 space-y-4"
        >
          <div className="flex justify-between items-start">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
          </div>
          <div className="h-12 bg-slate-200/70 dark:bg-slate-800/70 rounded-lg w-full"></div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
