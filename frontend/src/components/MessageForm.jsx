// src/components/MessageForm.jsx
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import socket from '../socket' // Подключаем сокет
import axios from 'axios'
import { useSelector } from 'react-redux'

const MessageForm = ({ activeChannel }) => {
  const token = useSelector((state) => state.auth.user.token)
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values) => {
      // Отправка через WebSocket для реального времени
      socket.emit('send_message', {
        message: values.message,
        channelId: activeChannel.id,
        token, // Добавьте аутентификацию, если требуется
      })

      // Отправка через POST для сохранения в базе
      await axios.post(
        '/api/v1/messages',
        {
          text: values.message,
          channelId: activeChannel.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      formik.setFieldValue('message', '')
    },
  })

  return (
    <Form className="p-3 border-top" onSubmit={formik.handleSubmit}>
      <Form.Group className="d-flex">
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Сообщение..."
          style={{ resize: 'none', flexGrow: 1 }}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        <Button variant="primary" className="ms-2" type="submit">
          Отправить
        </Button>
      </Form.Group>
    </Form>
  )
}

export default MessageForm
