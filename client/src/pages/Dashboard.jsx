import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../components/SkeletonLoader';
import TaskModal from '../components/TaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  Plus,
  Inbox,
  Activity,
  Flame,
} from 'lucide-react';
import { formatDateTime } from '../utils/dateUtils';

const Dashboard = ({ isCreateModalOpen, setIsCreateModalOpen }) => {
  const { user } = useAuth();
  const {
    tasks,
    stats,
    loading,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
  } = useTasks();

  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
  };

  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete._id);
      setTaskToDelete(null);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (taskToEdit) {
      return await updateTask(taskToEdit._id, formData);
    } else {
      return await createTask(formData);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/50 dark:border-slate-800/80 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-pink-500/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Real-Time Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{user?.name || 'User'}</span>! 👋
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Here is an overview of your productivity and task progress.
            </p>
          </div>

          <button
            onClick={() => {
              setTaskToEdit(null);
              setIsCreateModalOpen(true);
            }}
            className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 active:scale-95 transition-all shrink-0"
          >
            <Plus size={18} />
            <span>Create New Task</span>
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards */}
      {loading ? (
        <SkeletonLoader type="stats" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Tasks"
            value={stats.total}
            icon={CheckSquare}
            color="indigo"
            trend="All tasks created"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            color="amber"
            trend={`${stats.inProgress || 0} in progress`}
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            color="emerald"
            trend={`${Math.round((stats.completed / (stats.total || 1)) * 100)}% completion rate`}
          />
          <StatCard
            title="Due Today"
            value={stats.todayTasks}
            icon={Calendar}
            color="rose"
            trend="Action needed today"
          />
        </div>
      )}

      {/* Filter and Search controls */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flame size={20} className="text-amber-500" /> Task Overview
          </h2>
        </div>

        <FilterBar />

        {/* Task Cards Grid */}
        {loading ? (
          <SkeletonLoader count={6} />
        ) : tasks.length === 0 ? (
          /* Empty State */
          <div className="glass-card rounded-3xl p-12 text-center border border-white/50 dark:border-slate-800/80 my-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
              <Inbox size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No tasks found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              There are no tasks matching your selected filters or search terms. Try clearing your filters or create a new task!
            </p>
            <button
              onClick={() => {
                setTaskToEdit(null);
                setIsCreateModalOpen(true);
              }}
              className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-md transition-colors inline-flex items-center gap-2"
            >
              <Plus size={16} /> Create Task Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggleStatus={toggleTaskStatus}
                onViewDetails={setSelectedTaskForDetails}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </div>
        )}

        <Pagination />
      </div>

      {/* Recent Activity Timeline Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/50 dark:border-slate-800/80">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Activity size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Task Timeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Latest items in your workspace
            </p>
          </div>
        </div>

        {tasks.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={`act-${task._id}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      task.status === 'Completed'
                        ? 'bg-emerald-500'
                        : task.status === 'In Progress'
                        ? 'bg-amber-500'
                        : 'bg-indigo-500'
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {task.title}
                    </p>
                    <span className="text-xs text-slate-400">
                      Category: {task.category} • Priority: {task.priority}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {formatDateTime(task.updatedAt || task.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <TaskModal
        isOpen={isCreateModalOpen || !!taskToEdit}
        onClose={() => {
          setIsCreateModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        initialTask={taskToEdit}
      />

      {/* Task Details Drawer Modal */}
      <TaskDetailsModal
        isOpen={!!selectedTaskForDetails}
        onClose={() => setSelectedTaskForDetails(null)}
        task={selectedTaskForDetails}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
      />

    </div>
  );
};

export default Dashboard;
