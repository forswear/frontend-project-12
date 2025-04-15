import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import socket from '../socket.js'
import MessageForm from './MessageForm.jsx'
import { addNewMessage, getMessages } from '../slices/messagesSlice.js'

const ChatWindow = ({ localToken, activeChannel }) => {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages.messages)
  const filteredMessages = messages.filter(
    (message) => message.channelId === activeChannel?.id
  )
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages])

  useEffect(() => {
    dispatch(getMessages(localToken))
  }, [dispatch, localToken])

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addNewMessage(payload))
    })

    return () => socket.off('newMessage')
  }, [dispatch])

  return (
    <>
      {activeChannel && (
        <div className="bg-light border-bottom p-3">
          <h5 className="mb-0">{`# ${activeChannel.name}`}</h5>
        </div>
      )}
      <Card className="flex-grow-1 rounded-0 border-0 d-flex flex-column">
        <Card.Body className="overflow-auto" style={{ maxHeight: '79vh' }}>
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
      <MessageForm localToken={localToken} activeChannel={activeChannel} />
    </>
  )
}

export default ChatWindow
