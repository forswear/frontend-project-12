import { Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { initializeSocket } from '../../socket'
import { API_BASE_URL } from '../../api'

const RemovableChannel = ({ channel, isActive, onClick }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const localToken = useSelector((state) => state.auth.user.token)
  const socket = initializeSocket()

  const handleRenameChannel = () => {
    const newName = prompt(t('new_channel_name'))
    if (newName && newName.trim().length >= 3 && newName.trim().length <= 20) {
      const channelId = channel.id
      const authHeader = { headers: { Authorization: `Bearer ${localToken}` } }
      axios
        .put(
          `${API_BASE_URL}channels/${channelId}`,
          { name: newName },
          authHeader
        )
        .then(() => {
          dispatch({
            type: 'channels/renameChannel',
            payload: { id: channel.id, name: newName },
          })
          toast.success(t('channel_renamed_successfully'))
        })
        .catch((err) => {
          console.error(err)
          toast.error(t('error_renaming_channel'))
        })
    }
  }

  const handleDeleteChannel = () => {
    if (window.confirm(t('delete_confirmation'))) {
      axios
        .delete(`${API_BASE_URL}channels/${channel.id}`, {
          headers: { Authorization: `Bearer ${localToken}` },
        })
        .then(() => {
          dispatch({
            type: 'channels/removeChannel',
            payload: { id: channel.id },
          })
          socket.emit('removeChannel', { channelId: channel.id })
          toast.success(t('channel_deleted_successfully'))
        })
        .catch((err) => {
          console.error(err)
          toast.error(t('error_deleting_channel'))
        })
    }
  }

  return (
    <div className="d-flex">
      <Button
        variant={isActive ? 'primary' : 'light'}
        onClick={onClick}
        className={`text-start flex-grow-1 rounded-0 border-end-0 ${
          isActive ? 'text-white' : ''
        }`}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        #{channel.name}
      </Button>
      <Dropdown align="end" drop="down" className="rounded-0">
        <Dropdown.Toggle
          variant={isActive ? 'primary' : 'light'}
          className={`rounded-0 border-start-0 ${isActive ? 'text-white' : ''}`}
        />
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRenameChannel}>
            {t('rename_channel')}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteChannel}>
            {t('delete_channel')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default RemovableChannel
