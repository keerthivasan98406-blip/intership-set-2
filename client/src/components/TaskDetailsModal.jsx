import React from 'react';
import { X, Calendar, Tag, Clock, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { formatDate, formatDateTime, getDueDateStatus } from '../utils/dateUtils';

const TaskDetailsModal = ({ isOpen, onClose, task, onEdit, onDelete }) => {
  if (!isOpen || !task) return null;

  const dueDateInfo = getDueDateStatus(task.dueDate, task.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 dark:border-slate-800 z-10 animate-fade-in">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">
                {task.category}
              </span>
              <span
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                  task.priority === 'High'
                    ? 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                    : task.priority === 'Medium'
                    ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                }`}
              >
                {task.priority} Priority
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {task.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="mt-6 space-y-6">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
              Current Status
            </span>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-xl ${
                task.status === 'Completed'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : task.status === 'In Progress'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-500 text-white shadow-sm'
              }`}
            >
              {task.status}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Description</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40">
              {task.description || 'No detailed description provided for this task.'}
            </p>
          </div>

          {/* Timing details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium flex items-center gap-1.5 mb-1">
                <Calendar size={14} /> Due Date
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {formatDate(task.dueDate)}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium flex items-center gap-1.5 mb-1">
                <Clock size={14} /> Created At
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {formatDateTime(task.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 dark:border-slate-800/60 mt-6">
          <button
            onClick={() => {
              onClose();
              onDelete(task);
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-500/10 font-medium text-sm transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                onClose();
                onEdit(task);
              }}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-md transition-colors"
            >
              <Edit2 size={16} />
              <span>Edit Task</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskDetailsModal;
