import React from 'react'
import { Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { closeModal } from '../slices/modalSlice'
import { API_BASE_URL } from '../api'
import { toast } from 'react-toastify'
import { addNewChannel } from '../slices/channelsSlice'
import { initializeSocket } from '../socket'

const ModalNewChat = ({ setActiveChannel }) => {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()
  const { isModalOpen, modalType } = useSelector((state) => state.modal)
  const channels = useSelector((state) => state.channels.channels)
  const token = useSelector((state) => state.auth.user.token)
  const socket = initializeSocket()
  const inputRef = useRef(null)

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t('required_field'))
      .min(3, t('min_max_length', { min: 3, max: 20 }))
      .max(20, t('min_max_length', { min: 3, max: 20 }))
      .test('unique-channel', t('required_field'), (value) => {
        const cleanValue = leoProfanity.clean(value.trim())
        return !channels.some(
          (channel) => leoProfanity.clean(channel.name) === cleanValue
        )
      }),
  })

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: async (values) => {
      setDisabled(true)
      const filteredName = leoProfanity.clean(values.name.trim())
      try {
        const response = await axios.post(
          `${API_BASE_URL}channels`,
          { name: filteredName },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const newChannel = { ...response.data, name: filteredName }
        dispatch(addNewChannel(newChannel))

        socket.emit('newChannel', newChannel)

        setActiveChannel(newChannel)

        toast.success(t('channel_created'))
        formik.resetForm()
        dispatch(closeModal())
      } catch (err) {
        console.error(err)
        if (err.response) {
          toast.error(t('error_creating_channel'))
        } else if (err.request) {
          toast.error(t('network_error'))
        } else {
          toast.error(t('unknown_error'))
        }
      } finally {
        setDisabled(false)
      }
    },
  })

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
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              ref={inputRef}
              name="name"
              id="name"
              className="mb-2 form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="visually-hidden" htmlFor="name">
              {t('channel_name')}
            </label>
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={disabled}
              >
                {t('submit')}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalNewChat
