// src/socket.js
import { io } from 'socket.io-client'

// Подключение к серверу (указываем порт вашего сервера)
const socket = io('http://localhost:5001', {
  reconnection: true,
  reconnectionAttempts: 5,
})

// Обработка ошибок подключения
socket.on('connect_error', (error) => {
  console.error('Ошибка подключения к WebSocket:', error)
})

export default socket
