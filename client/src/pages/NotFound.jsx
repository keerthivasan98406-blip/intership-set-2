import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-10 max-w-md w-full text-center border border-white/50 dark:border-slate-800/80">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
          <HelpCircle size={36} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">404</h1>
        <p className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">Page Not Found</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 transition-colors"
        >
          <Home size={18} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
