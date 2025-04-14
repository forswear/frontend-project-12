import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import MessageForm from './MessageForm.jsx'

const ChatWindow = ({ activeChannel }) => {
  return (
    <>
      <div className="bg-light border-bottom p-3">
        <h5 className="mb-0">{activeChannel?.name}</h5>
      </div>
      <Card className="flex-grow-1 rounded-0 border-0">
        <Card.Body className="d-flex flex-column overflow-auto">
          {/* Сообщения чата */}
        </Card.Body>
      </Card>
      {/* Форма ввода нового сообщения */}
      <MessageForm />
    </>
  )
}

export default React.memo(ChatWindow)
