import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { closeModal } from '../slices/modalSlice'

const ModalNewChat = () => {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()
  const { isModalOpen, modalType } = useSelector((state) => state.modal)
  const channels = useSelector((state) => state.channels.channels)

  const validationSchema = yup.object({
    newChannelName: yup
      .string()
      .required(t('required_field'))
      .min(3, t('min_max_length', { min: 3, max: 20 }))
      .max(20, t('min_max_length', { min: 3, max: 20 }))
      .test('unique-channel', t('required_field'), (value) => {
        return !channels.some((channel) => channel.name === value.trim())
      })
      .test('profanity-check', t('profanity_not_allowed'), (value) => {
        return !leoProfanity.check(value.trim())
      }),
  })

  const formik = useFormik({
    initialValues: { newChannelName: '' },
    validationSchema,
    onSubmit: async (values) => {
      setDisabled(true)
      const token = localStorage.getItem('token')

      const filteredName = leoProfanity.clean(values.newChannelName.trim())

      try {
        await axios.post(
          '/api/v1/channels',
          { name: filteredName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      } catch (err) {
        console.error(err)
      } finally {
        formik.resetForm()
        setDisabled(false)
        dispatch(closeModal())
      }
    },
  })

  const inputRef = useRef(null)

  useEffect(() => {
    if (isModalOpen && modalType === 'addChannel') {
      inputRef.current?.focus()
    }
  }, [isModalOpen, modalType])

  const handleClose = () => {
    formik.resetForm()
    dispatch(closeModal())
  }

  if (modalType !== 'addChannel') {
    return null
  }

  return (
    <Modal show={isModalOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('add_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="newChannelName">
            <Form.Control
              ref={inputRef}
              id="newChannelName"
              type="text"
              name="newChannelName"
              placeholder={t('channel_name')}
              onChange={formik.handleChange}
              value={formik.values.newChannelName}
              isInvalid={
                formik.touched.newChannelName && !!formik.errors.newChannelName
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={disabled}>
              {t('submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalNewChat
