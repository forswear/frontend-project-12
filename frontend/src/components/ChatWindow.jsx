import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
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
  const filteredMessages = useSelector((state) =>
    selectMessagesByChannelId(state, activeChannel?.id)
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages])

  useEffect(() => {
    if (token) {
      const socket = initializeSocket(token)
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
      return () => {
        socket.off('newMessage', handleNewMessage)
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
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {filteredMessages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong>{message.username}:</strong> {message.body}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageForm activeChannel={activeChannel} />
    </div>
  )
}

export default ChatWindow
