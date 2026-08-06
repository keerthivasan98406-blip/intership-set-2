import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

const Pagination = () => {
  const { pagination, setPage } = useTasks();
  const { page, pages, total } = pagination;

  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 dark:border-slate-800/60 mt-8">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Showing page <span className="font-semibold text-slate-800 dark:text-slate-200">{page}</span> of{' '}
        <span className="font-semibold text-slate-800 dark:text-slate-200">{pages}</span> ({total} tasks total)
      </p>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-xl glass-card text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-all text-xs flex items-center gap-1 font-medium"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                page === p
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= pages}
          className="p-2 rounded-xl glass-card text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-600 transition-all text-xs flex items-center gap-1 font-medium"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
