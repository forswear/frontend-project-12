// src/socket.js
import io from 'socket.io-client'

let socket = null

export const initializeSocket = (token) => {
  if (!socket) {
    const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'
    socket = io(serverUrl, {
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
    })

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })

    socket.on('newChannel', (payload) => {
      const eventHandler = window.dispatchEvent(
        new CustomEvent('newChannel', { detail: payload })
      )
      if (!eventHandler.defaultPrevented) {
        console.warn("No handler for 'newChannel'")
      }
    })

    socket.on('newMessage', (payload) => {
      const eventHandler = window.dispatchEvent(
        new CustomEvent('newMessage', { detail: payload })
      )
      if (!eventHandler.defaultPrevented) {
        console.warn("No handler for 'newMessage'")
      }
    })

    socket.on('removeChannel', (payload) => {
      const eventHandler = window.dispatchEvent(
        new CustomEvent('removeChannel', { detail: payload })
      )
      if (!eventHandler.defaultPrevented) {
        console.warn("No handler for 'removeChannel'")
      }
    })
  }
  return socket
}

export const getSocket = () => socket
