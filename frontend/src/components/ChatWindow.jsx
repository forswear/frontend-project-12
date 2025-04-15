// src/components/ChatWindow.jsx
import React, { useEffect } from 'react' // Добавьте useEffect здесь
import { Card } from 'react-bootstrap'
import socket from '../socket' // Подключаем сокет
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addOneMessage } from '../slices/messagesSlice'
import MessageForm from './MessageForm.jsx' // Импортируем форму

const ChatWindow = ({ activeChannel }) => {
  const dispatch = useDispatch()
  const messages = useSelector((state) =>
    state.messages.messages.filter((msg) => msg.channelId === activeChannel?.id)
  )

  // Подписываемся на события WebSocket
  useEffect(() => {
    if (!activeChannel) return // Проверяем наличие активного канала

    socket.on('new_message', (message) => {
      if (message.channelId === activeChannel.id) {
        dispatch(addOneMessage(message))
      }
    })

    return () => {
      socket.off('new_message') // Удаляем обработчик при размонтировании
    }
  }, [dispatch, activeChannel])

  return (
    <>
      <div className="bg-light border-bottom p-3">
        <h5 className="mb-0">{activeChannel?.name}</h5>
      </div>
      <Card className="flex-grow-1 rounded-0 border-0">
        <Card.Body className="d-flex flex-column overflow-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <p>{msg.text}</p>
            </div>
          ))}
        </Card.Body>
      </Card>
      <MessageForm activeChannel={activeChannel} />
    </>
  )
}

export default React.memo(ChatWindow)
