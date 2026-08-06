import React from 'react';
import {
  CheckCircle,
  Circle,
  Calendar,
  Tag,
  Edit2,
  Trash2,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { getDueDateStatus } from '../utils/dateUtils';

const priorityColors = {
  Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  High: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

const categoryColors = {
  Work: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Personal: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  Urgent: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Ideas: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  General: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  Education: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  Finance: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

const TaskCard = ({
  task,
  onToggleStatus,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const isCompleted = task.status === 'Completed';
  const dueDateInfo = getDueDateStatus(task.dueDate, task.status);

  return (
    <div
      className={`glass-card rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 ${
        isCompleted
          ? 'border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/10 opacity-80'
          : 'border-white/50 dark:border-slate-800/80'
      }`}
    >
      <div>
        {/* Header: Status toggle & Priority */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <button
            onClick={() => onToggleStatus(task._id, task.status)}
            className="flex items-center space-x-2 text-left group/btn focus:outline-none"
            title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
          >
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-500/20 shrink-0 transition-transform group-hover/btn:scale-110" />
            ) : (
              <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 transition-transform group-hover/btn:scale-110" />
            )}
            <h3
              className={`font-semibold text-base leading-snug text-slate-900 dark:text-slate-100 line-clamp-1 transition-all ${
                isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
              }`}
            >
              {task.title}
            </h3>
          </button>

          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border shrink-0 ${
              priorityColors[task.priority] || priorityColors.Medium
            }`}
          >
            {task.priority}
          </span>
        </div>

        {/* Task Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 pr-1">
          {task.description || 'No description provided.'}
        </p>
      </div>

      {/* Footer: Metadata & Actions */}
      <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Due Date Indicator */}
          {dueDateInfo && (
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border font-medium ${dueDateInfo.color}`}>
              <Calendar size={13} />
              <span>{dueDateInfo.label}</span>
              {dueDateInfo.isOverdue && <AlertCircle size={13} className="ml-0.5" />}
            </div>
          )}

          {/* Category Pill */}
          <div
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg font-medium ${
              categoryColors[task.category] || categoryColors.General
            }`}
          >
            <Tag size={12} />
            <span>{task.category}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-1 pt-1">
          <button
            onClick={() => onViewDetails(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-500/10 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-500/10 transition-colors"
            title="Edit Task"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
