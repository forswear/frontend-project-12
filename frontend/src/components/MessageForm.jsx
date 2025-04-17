import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import socket from '../socket'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const MessageForm = ({ activeChannel }) => {
  const { t } = useTranslation()
  const token = useSelector((state) => state.auth.user.token)

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values) => {
      socket.emit('send_message', {
        message: values.message,
        channelId: activeChannel.id,
        token,
      })

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
          placeholder={t('message_placeholder')}
          style={{ resize: 'none', flexGrow: 1 }}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        <Button variant="primary" className="ms-2" type="submit">
          {t('send')}
        </Button>
      </Form.Group>
    </Form>
  )
}

export default MessageForm
