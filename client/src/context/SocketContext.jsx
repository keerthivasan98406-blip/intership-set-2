import React, { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { initSocket, disconnectSocket } from '../services/socket';
import toast from 'react-hot-toast';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user && token) {
      const socketInstance = initSocket(token);
      setSocket(socketInstance);

      if (user._id) {
        socketInstance.emit('join_user_room', user._id);
      }

      socketInstance.on('task:created', (data) => {
        toast.success(`⚡ Live: ${data.message}`, { id: `socket-create-${data.task._id}` });
      });

      socketInstance.on('task:updated', (data) => {
        toast.info(`⚡ Live: ${data.message}`, { id: `socket-update-${data.task._id}` });
      });

      socketInstance.on('task:deleted', (data) => {
        toast.error(`⚡ Live: ${data.message}`, { id: `socket-delete-${data.taskId}` });
      });

      return () => {
        socketInstance.off('task:created');
        socketInstance.off('task:updated');
        socketInstance.off('task:deleted');
        disconnectSocket();
      };
    } else {
      disconnectSocket();
      setSocket(null);
    }
  }, [user, token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
