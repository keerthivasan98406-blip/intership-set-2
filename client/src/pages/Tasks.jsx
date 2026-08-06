import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../components/SkeletonLoader';
import TaskModal from '../components/TaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { CheckSquare, Plus, Inbox } from 'lucide-react';

const Tasks = ({ isCreateModalOpen, setIsCreateModalOpen }) => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');

  const {
    tasks,
    loading,
    setStatusFilter,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
  } = useTasks();

  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Synchronize status query string from URL (e.g. sidebar navigation clicks)
  useEffect(() => {
    if (statusParam) {
      setStatusFilter(statusParam);
    }
  }, [statusParam, setStatusFilter]);

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
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="text-indigo-600 dark:text-indigo-400" />
            {statusParam ? `${statusParam} Tasks` : 'All Tasks'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Filter, organize, and manage your complete task list.
          </p>
        </div>

        <button
          onClick={() => {
            setTaskToEdit(null);
            setIsCreateModalOpen(true);
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 active:scale-95 transition-all"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Controls */}
      <FilterBar />

      {/* Task Grid */}
      {loading ? (
        <SkeletonLoader count={6} />
      ) : tasks.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-white/50 dark:border-slate-800/80 my-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
            <Inbox size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No tasks found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or add a new task to get started.
          </p>
          <button
            onClick={() => {
              setTaskToEdit(null);
              setIsCreateModalOpen(true);
            }}
            className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-md transition-colors inline-flex items-center gap-2"
          >
            <Plus size={16} /> Add Task
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

      {/* Modals */}
      <TaskModal
        isOpen={isCreateModalOpen || !!taskToEdit}
        onClose={() => {
          setIsCreateModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        initialTask={taskToEdit}
      />

      <TaskDetailsModal
        isOpen={!!selectedTaskForDetails}
        onClose={() => setSelectedTaskForDetails(null)}
        task={selectedTaskForDetails}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      <DeleteConfirmModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
      />

    </div>
  );
};

export default Tasks;
