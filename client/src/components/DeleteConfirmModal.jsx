import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-slate-800 z-10 animate-fade-in text-center">
        
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
          <AlertTriangle size={28} />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Delete Task?
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-slate-200">"{taskTitle}"</span>? This action cannot be undone.
        </p>

        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 font-medium text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm shadow-lg shadow-rose-500/25 active:scale-95 transition-all"
          >
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
