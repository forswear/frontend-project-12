// src/socket.js
import io from 'socket.io-client';
import Rollbar from 'rollbar';

const rollbar = new Rollbar('YOUR_ACCESS_TOKEN'); // Замените на ваш токен Rollbar

let socket = null;

export const initializeSocket = (token) => {
  if (!socket) {
    const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    socket = io(serverUrl, {
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      rollbar.info('WebSocket connected');
    });

    socket.on('connect_error', (error) => {
      rollbar.error('WebSocket connection error:', error);
    });

    socket.on('disconnect', () => {
      rollbar.info('WebSocket disconnected');
    });

    socket.on('newChannel', (payload) => {
      const eventHandler = window.dispatchEvent(
        new CustomEvent('newChannel', { detail: payload })
      );
      if (!eventHandler.defaultPrevented) {
        rollbar.warning("No handler for 'newChannel'");
      }
    });

    socket.on('newMessage', (payload) => {
      const eventHandler = window.dispatchEvent(
        new CustomEvent('newMessage', { detail: payload })
      );
      if (!eventHandler.defaultPrevented) {
        rollbar.warning("No handler for 'newMessage'");
      }
    });

    socket.on('removeChannel', (payload) => {
      const eventHandler = window.dispatchEvent(
        new CustomEvent('removeChannel', { detail: payload })
      );
      if (!eventHandler.defaultPrevented) {
        rollbar.warning("No handler for 'removeChannel'");
      }
    });

    socket.on('renameChannel', (payload) => {
      const eventHandler = window.dispatchEvent(
        new CustomEvent('renameChannel', { detail: payload })
      );
      if (!eventHandler.defaultPrevented) {
        rollbar.warning("No handler for 'renameChannel'");
      }
    });
  }
  return socket;
};

export const getSocket = () => socket;
