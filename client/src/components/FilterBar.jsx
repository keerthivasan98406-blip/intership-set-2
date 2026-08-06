import React from 'react';
import { Search, Filter, RotateCcw, ArrowUpDown, Tag, AlertCircle } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

const categories = ['All', 'Work', 'Personal', 'Urgent', 'Ideas', 'General', 'Education', 'Finance'];
const priorities = ['All', 'Low', 'Medium', 'High'];
const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

const FilterBar = () => {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    resetFilters,
  } = useTasks();

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/50 dark:border-slate-800/80 mb-6 space-y-4 shadow-sm">
      
      {/* Top row: Search input & Reset button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Live Search */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks by title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row: Dropdowns for Priority, Category, Sorting & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Priority Select */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-medium hidden sm:inline">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl glass-input text-slate-700 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
            >
              {priorities.map((p) => (
                <option key={p} value={p} className="bg-slate-100 dark:bg-slate-900">
                  Priority: {p}
                </option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-medium hidden sm:inline">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl glass-input text-slate-700 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-100 dark:bg-slate-900">
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="flex items-center space-x-1.5">
            <ArrowUpDown size={14} className="text-slate-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl glass-input text-slate-700 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
            >
              <option value="latest" className="bg-slate-100 dark:bg-slate-900">Sort by: Latest</option>
              <option value="dueDate" className="bg-slate-100 dark:bg-slate-900">Sort by: Due Date</option>
              <option value="oldest" className="bg-slate-100 dark:bg-slate-900">Sort by: Oldest</option>
            </select>
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-500/10 transition-colors ml-auto sm:ml-0"
          title="Reset All Filters"
        >
          <RotateCcw size={14} />
          <span>Reset Filters</span>
        </button>
      </div>

    </div>
  );
};

export default FilterBar;
