const jwt = require('jsonwebtoken');

const socketHandler = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'supersecretjwtkey_taskmanager_2026'
        );
        socket.userId = decoded.id;
        return next();
      } catch (err) {
        console.warn('[Socket.IO] Authentication failed for incoming connection');
      }
    }
    // Allow connection even without token, but socket won't join specific user room until authenticated
    next();
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    if (socket.userId) {
      const roomName = `user_${socket.userId}`;
      socket.join(roomName);
      console.log(`[Socket.IO] Socket ${socket.id} joined room: ${roomName}`);
    }

    socket.on('join_user_room', (userId) => {
      if (userId) {
        const roomName = `user_${userId}`;
        socket.join(roomName);
        console.log(`[Socket.IO] Socket ${socket.id} joined room on demand: ${roomName}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
