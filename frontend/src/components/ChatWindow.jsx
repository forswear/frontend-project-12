import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import MessageForm from './MessageForm'
import { selectMessagesByChannelId } from '../selectors'
import { initializeSocket } from '../socket'
import { addNewMessage } from '../slices/messagesSlice'
import { useTranslation } from 'react-i18next'

const ChatWindow = ({ activeChannel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.user.token)
  const messagesEndRef = useRef(null)
  const [currentChannelId, setCurrentChannelId] = useState(null)
  const filteredMessages = useSelector((state) =>
    selectMessagesByChannelId(state, activeChannel?.id)
  )

  useEffect(() => {
    if (activeChannel?.id !== currentChannelId) {
      setCurrentChannelId(activeChannel?.id)
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [activeChannel?.id, currentChannelId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages])

  useEffect(() => {
    let socket
    if (token) {
      socket = initializeSocket(token)
      const handleNewMessage = (payload) => {
        if (
          payload?.body &&
          payload?.channelId === activeChannel?.id &&
          payload?.username
        ) {
          dispatch(addNewMessage(payload))
        }
      }
      socket.on('newMessage', handleNewMessage)
    }
    return () => {
      if (socket) {
        socket.off('newMessage')
      }
    }
  }, [dispatch, token, activeChannel?.id])

  if (!activeChannel) {
    return <div className="p-3">{t('select_channel')}</div>
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>#{activeChannel.name}</b>
        </p>
        <span className="text-muted">{`${filteredMessages.length} сообщений`}</span>
      </div>
      <div
        id={`chat-${activeChannel.id}`}
        className="chat-messages overflow-auto px-5 flex-grow-1"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {filteredMessages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong>{message.username}:</strong> {message.body}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto p-3 border-top">
        <MessageForm activeChannel={activeChannel} />
      </div>
    </div>
  )
}

export default ChatWindow
