const Task = require('../models/Task');

// @desc    Get user tasks with search, filter, sort & pagination
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { search, status, priority, category, sortBy, page = 1, limit = 10 } = req.query;

    const query = { userId };

    // Search filter (title or description)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Priority filter
    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // default latest
    if (sortBy === 'dueDate') {
      sortOptions = { dueDate: 1 };
    } else if (sortBy === 'priority') {
      // Sorting priority custom logic
      sortOptions = { priority: -1, createdAt: -1 };
    } else if (sortBy === 'oldest') {
      sortOptions = { createdAt: 1 };
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalTasks = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    // Calculate user dashboard stats
    const allUserTasks = await Task.find({ userId });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const stats = {
      total: allUserTasks.length,
      pending: allUserTasks.filter((t) => t.status === 'Pending').length,
      inProgress: allUserTasks.filter((t) => t.status === 'In Progress').length,
      completed: allUserTasks.filter((t) => t.status === 'Completed').length,
      todayTasks: allUserTasks.filter((t) => {
        const d = new Date(t.dueDate);
        return d >= today && d < tomorrow;
      }).length,
    };

    res.json({
      tasks,
      page: pageNumber,
      pages: Math.ceil(totalTasks / limitNumber) || 1,
      total: totalTasks,
      stats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, dueDate, category } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: 'Title and Due Date are required' });
    }

    const task = await Task.create({
      title,
      description: description || '',
      priority: priority || 'Medium',
      status: status || 'Pending',
      dueDate,
      category: category || 'General',
      userId: req.user._id,
    });

    // Emit Socket.IO Event
    if (req.io) {
      req.io.to(`user_${req.user._id}`).emit('task:created', {
        task,
        message: `Task "${task.title}" created`,
        actionBy: req.user.name,
      });
    }

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, priority, status, dueDate, category } = req.body;

    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.priority = priority !== undefined ? priority : task.priority;
    task.status = status !== undefined ? status : task.status;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
    task.category = category !== undefined ? category : task.category;

    const updatedTask = await task.save();

    // Emit Socket.IO Event
    if (req.io) {
      req.io.to(`user_${req.user._id}`).emit('task:updated', {
        task: updatedTask,
        message: `Task "${updatedTask.title}" updated`,
        actionBy: req.user.name,
      });
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status only
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required (Pending, In Progress, Completed)' });
    }

    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    const updatedTask = await task.save();

    // Emit Socket.IO Event
    if (req.io) {
      req.io.to(`user_${req.user._id}`).emit('task:updated', {
        task: updatedTask,
        message: `Task "${updatedTask.title}" status changed to ${status}`,
        actionBy: req.user.name,
      });
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();

    // Emit Socket.IO Event
    if (req.io) {
      req.io.to(`user_${req.user._id}`).emit('task:deleted', {
        taskId: req.params.id,
        message: `Task "${task.title}" was deleted`,
        actionBy: req.user.name,
      });
    }

    res.json({ message: 'Task removed successfully', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
