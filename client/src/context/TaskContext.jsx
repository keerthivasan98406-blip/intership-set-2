import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';
import { SocketContext } from './SocketContext';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    todayTasks: 0,
  });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 9,
  });

  // Filter & Search Params State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'dueDate', 'oldest'

  // Fetch Tasks with query parameters
  const fetchTasks = useCallback(async (overrides = {}) => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const params = {
        search: overrides.search !== undefined ? overrides.search : search,
        status: overrides.statusFilter !== undefined ? overrides.statusFilter : statusFilter,
        priority: overrides.priorityFilter !== undefined ? overrides.priorityFilter : priorityFilter,
        category: overrides.categoryFilter !== undefined ? overrides.categoryFilter : categoryFilter,
        sortBy: overrides.sortBy !== undefined ? overrides.sortBy : sortBy,
        page: overrides.page !== undefined ? overrides.page : pagination.page,
        limit: pagination.limit,
      };

      const response = await api.get('/tasks', { params });
      setTasks(response.data.tasks);
      setStats(response.data.stats || stats);
      setPagination((prev) => ({
        ...prev,
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total,
      }));
    } catch (error) {
      console.error('Fetch tasks error:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, search, statusFilter, priorityFilter, categoryFilter, sortBy, pagination.page, pagination.limit]);

  // Initial load when filter / search / page changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, fetchTasks]);

  // Real-time socket sync listener
  useEffect(() => {
    if (!socket) return;

    const handleSocketCreate = (data) => {
      fetchTasks();
    };

    const handleSocketUpdate = (data) => {
      fetchTasks();
    };

    const handleSocketDelete = (data) => {
      fetchTasks();
    };

    socket.on('task:created', handleSocketCreate);
    socket.on('task:updated', handleSocketUpdate);
    socket.on('task:deleted', handleSocketDelete);

    return () => {
      socket.off('task:created', handleSocketCreate);
      socket.off('task:updated', handleSocketUpdate);
      socket.off('task:deleted', handleSocketDelete);
    };
  }, [socket, fetchTasks]);

  // Task Actions
  const createTask = async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      toast.success('Task created successfully!');
      fetchTasks();
      return { success: true, data: res.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await api.put(`/tasks/${id}`, taskData);
      toast.success('Task updated successfully!');
      fetchTasks();
      return { success: true, data: res.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      return { success: false, message };
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    try {
      // Optimistic update
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, status: nextStatus } : task
        )
      );

      const res = await api.patch(`/tasks/${id}/status`, { status: nextStatus });
      toast.success(`Task marked as ${nextStatus}`);
      fetchTasks();
      return { success: true, data: res.data };
    } catch (error) {
      toast.error('Failed to update task status');
      fetchTasks();
      return { success: false };
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully');
      fetchTasks();
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete task');
      return { success: false };
    }
  };

  const setPage = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    fetchTasks({ page: newPage });
  };

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
    setSortBy('latest');
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchTasks({ search: '', statusFilter: 'All', priorityFilter: 'All', categoryFilter: 'All', sortBy: 'latest', page: 1 });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        pagination,
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
        fetchTasks,
        createTask,
        updateTask,
        toggleTaskStatus,
        deleteTask,
        setPage,
        resetFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
