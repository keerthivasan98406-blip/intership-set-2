export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getDueDateStatus = (dueDateString, status) => {
  if (!dueDateString) return null;
  if (status === 'Completed') return { label: 'Completed', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };

  const due = new Date(dueDateString);
  due.setHours(23, 59, 59, 999);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (due < today) {
    return { label: 'Overdue', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20', isOverdue: true };
  }
  
  if (due.toDateString() === today.toDateString()) {
    return { label: 'Due Today', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
  }

  if (due.toDateString() === tomorrow.toDateString()) {
    return { label: 'Due Tomorrow', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' };
  }

  return { label: formatDate(dueDateString), color: 'text-slate-500 bg-slate-500/10 border-slate-500/20' };
};
