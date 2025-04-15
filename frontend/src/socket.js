import { io } from 'socket.io-client'

const socket = io('http://localhost:5001', {
  reconnection: true,
  reconnectionAttempts: 5,
})

socket.on('connect_error', (error) => {
  console.error('Ошибка подключения к WebSocket:', error)
})

export default socket
