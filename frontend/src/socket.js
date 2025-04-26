import io from 'socket.io-client'
import Rollbar from 'rollbar'
import { toast } from 'react-toastify'
import i18n from 'i18next'

const rollbar = new Rollbar({
  accessToken: 'db2977d78de306f3d8d17b9137c1f4bf',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let socket = null

export const initializeSocket = (token) => {
  if (socket?.connected) return socket

  const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'
  socket = io(serverUrl, {
    auth: { token },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  })

  socket.on('connect', () => {
    rollbar.info('WebSocket connected')
  })

  socket.on('connect_error', (error) => {
    rollbar.error('WebSocket connection error:', error)
    toast.error(i18n.t('network_error'))
  })

  socket.on('disconnect', (reason) => {
    rollbar.info('WebSocket disconnected', { reason })
    if (reason === 'io server disconnect') {
      socket.connect()
    }
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    rollbar.warning('Attempt to get socket before initialization')
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
