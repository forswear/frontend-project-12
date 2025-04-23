import { Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { initializeSocket } from '../socket'
import MessageForm from './MessageForm.jsx'
import { addNewMessage, getMessages } from '../slices/messagesSlice.js'
import { useTranslation } from 'react-i18next'
import { selectMessagesByChannelId } from '../selectors'

const ChatWindow = ({ activeChannel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.user.token)
  const messagesEndRef = useRef(null)
  const filteredMessages = useSelector((state) =>
    selectMessagesByChannelId(state, activeChannel?.id)
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages])

  useEffect(() => {
    if (token) {
      dispatch(getMessages(token))
    }
  }, [dispatch, token, activeChannel?.id])

  const socket = initializeSocket()
  useEffect(() => {
    const handleNewMessage = (payload) => {
      if (payload?.body && payload?.channelId && payload?.username) {
        dispatch(addNewMessage(payload))
      }
    }
    socket.on('newMessage', handleNewMessage)
    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, [dispatch, socket])

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
