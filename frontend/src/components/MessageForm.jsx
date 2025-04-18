import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import socket from '../socket.js'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'

const MessageForm = ({ activeChannel }) => {
  const { t } = useTranslation()
  const token = useSelector((state) => state.auth.user.token)
  const username = useSelector((state) => state.auth.user.username)

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values, { resetForm }) => {
      if (!values.message.trim() || !activeChannel?.id) return

      // Фильтрация нецензурных слов в сообщении
      const filteredMessage = leoProfanity.clean(values.message.trim())

      try {
        const response = await axios.post(
          '/api/v1/messages',
          {
            body: filteredMessage,
            channelId: activeChannel.id,
            username: username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        socket.emit('send_message', {
          body: filteredMessage,
          channelId: activeChannel.id,
          username: username,
          id: response.data.id,
        })

        resetForm()
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error)
      }
    },
  })

  return (
    <Form className="p-3 border-top" onSubmit={formik.handleSubmit}>
      <Form.Group className="d-flex">
        <Form.Control
          as="textarea"
          rows={2}
          placeholder={t('message_placeholder')}
          style={{ resize: 'none', flexGrow: 1 }}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          required
        />
        <Button
          variant="primary"
          className="ms-2"
          type="submit"
          disabled={!formik.values.message.trim()}
        >
          {t('send')}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default MessageForm
