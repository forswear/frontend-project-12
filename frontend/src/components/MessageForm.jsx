import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { API_BASE_URL } from '../api'

const MessageForm = ({ activeChannel }) => {
  const { t } = useTranslation()
  const token = useSelector((state) => state.auth.user.token)
  const username = useSelector((state) => state.auth.user.username)

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      if (!values.body.trim() || !activeChannel?.id) return

      const filteredMessage = leoProfanity.clean(values.body.trim())
      try {
        const messageData = {
          body: filteredMessage,
          channelId: activeChannel.id,
          username,
        }
        const authHeader = { headers: { Authorization: `Bearer ${token}` } }
        await axios.post(`${API_BASE_URL}messages`, messageData, authHeader)
        resetForm()
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error)
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit} className="d-flex align-items-center">
      <Form.Group className="flex-grow-1 me-2">
        <Form.Control
          as="input"
          type="text"
          name="body"
          aria-label="Новое сообщение"
          placeholder={t('message_placeholder')}
          className="border-0 p-0 ps-2"
          value={formik.values.body}
          onChange={formik.handleChange}
          required
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!formik.values.body.trim()}
        style={{ height: '38px' }}
      >
        {t('send')}
      </Button>
    </Form>
  )
}

export default MessageForm
