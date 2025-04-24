import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const RemoveChannelModal = ({ show, onHide, channelId, onConfirm }) => {
  const { t } = useTranslation()

  const handleConfirm = async () => {
    try {
      await onConfirm(channelId)
      toast.success(t('channel_removed'))
      onHide()
    } catch (error) {
      console.error(error)
      if (error.response) {
        toast.error(t('error_deleting_channel'))
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
        <Modal.Title>{t('remove_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('remove_channel_confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            {t('remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal
