import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { channelNameValidationSchema } from '../utils/yupSchemas'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { API_BASE_URL } from '../api'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

const EditChannelModal = ({ show, onHide, channel, onSave }) => {
  const { t } = useTranslation()
  const [newName, setNewName] = useState(channel.name)
  const token = useSelector((state) => state.auth.user.token)

  const handleSubmit = async () => {
    try {
      const validatedName = channelNameValidationSchema.validateSync(newName)
      const filteredName = leoProfanity.clean(validatedName)
      const authHeader = { headers: { Authorization: `Bearer ${token}` } }
      await axios.put(
        `${API_BASE_URL}channels/${channel.id}`,
        { name: filteredName },
        authHeader
      )
      onSave(filteredName)
      toast.success(t('channel_renamed'))
      onHide()
    } catch (error) {
      console.error(error)
      if (error.name === 'ValidationError') {
        toast.error(error.message)
      } else if (error.response) {
        toast.error(t('error_renaming_channel'))
      } else if (error.request) {
        toast.error(t('network_error'))
      } else {
        toast.error(t('unknown_error'))
      }
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('edit_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input
            name="name"
            id="name"
            className="mb-2 form-control"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <label className="visually-hidden" htmlFor="name">
            {t('channel_name')}
          </label>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={onHide}>
              {t('cancel')}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {t('submit')}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default EditChannelModal
