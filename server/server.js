const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const socketHandler = require('./socket/socketHandler');

// Initialize Express App & HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
});

// Attach socket instance to req so controllers can emit real-time events
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Register Socket Handler
socketHandler(io);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = (port) => {
  server.listen(port, () => {
    console.log(`=================================`);
    console.log(`🚀 Task Manager Server running on port ${port}`);
    console.log(`=================================`);
  });
};

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    const nextPort = Number(PORT) + 1;
    console.warn(`[Server] Port ${PORT} is currently in use. Trying port ${nextPort}...`);
    startServer(nextPort);
  } else {
    console.error('[Server Error]', error);
  }
});

startServer(PORT);

