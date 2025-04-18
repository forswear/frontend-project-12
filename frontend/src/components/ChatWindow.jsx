import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import socket from '../socket.js'
import MessageForm from './MessageForm.jsx'
import { addNewMessage, getMessages } from '../slices/messagesSlice.js'
import { useTranslation } from 'react-i18next'

const ChatWindow = ({ localToken, activeChannel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages.messages)
  const messagesEndRef = useRef(null)

  // Фильтрация сообщений по активному каналу
  const filteredMessages = messages.filter(
    (message) => message.channelId === activeChannel?.id
  )

  // Автопрокрутка к новым сообщениям
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages])

  // Загрузка сообщений при монтировании и смене канала
  useEffect(() => {
    if (localToken) {
      dispatch(getMessages(localToken))
    }
  }, [dispatch, localToken, activeChannel?.id])

  // Подписка на новые сообщения через WebSocket
  useEffect(() => {
    const handleNewMessage = (payload) => {
      // Проверяем структуру данных
      if (payload && payload.body && payload.channelId && payload.username) {
        dispatch(
          addNewMessage({
            id: payload.id,
            body: payload.body,
            channelId: payload.channelId,
            username: payload.username,
          })
        )
      }
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [dispatch])

  if (!activeChannel) {
    return <div className="p-3">{t('select_channel')}</div>
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light border-bottom p-3">
        <h5 className="mb-0">{`# ${activeChannel.name}`}</h5>
      </div>
      <Card className="flex-grow-1 rounded-0 border-0">
        <Card.Body
          className="overflow-auto p-3"
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        >
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className="mb-2"
              style={{ wordWrap: 'break-word' }}
            >
              <strong>{message.username}:</strong> {message.body}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>
      </Card>
      <MessageForm activeChannel={activeChannel} />
    </div>
  )
}

export default ChatWindow
