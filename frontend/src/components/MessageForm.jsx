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
    initialValues: { message: '' },
    onSubmit: async (values, { resetForm }) => {
      if (!values.message.trim() || !activeChannel?.id) return

      const filteredMessage = leoProfanity.clean(values.message.trim())
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formik.handleSubmit()
    }
  }

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
          onKeyDown={handleKeyDown}
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
