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
  }
  return socket
}

export const getSocket = () => socket
