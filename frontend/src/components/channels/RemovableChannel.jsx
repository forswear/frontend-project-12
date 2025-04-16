import { Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import socket from '../../socket'

const RemovableChannel = ({ channel, isActive, onClick }) => {
  const dispatch = useDispatch()
  const localToken = useSelector((state) => state.auth.user.token)

  const handleRenameChannel = () => {
    const newName = prompt('Введите новое имя канала:')
    if (newName && newName.trim().length >= 3 && newName.trim().length <= 20) {
      axios
        .put(
          `/api/v1/channels/${channel.id}`,
          { name: newName },
          {
            headers: { Authorization: `Bearer ${localToken}` },
          }
        )
        .then(() => {
          dispatch({
            type: 'channels/renameChannel',
            payload: { id: channel.id, name: newName },
          })
        })
        .catch((err) => console.error(err))
    }
  }

  const handleDeleteChannel = () => {
    if (
      window.confirm(
        'Вы уверены, что хотите удалить этот канал? Все сообщения будут удалены.'
      )
    ) {
      axios
        .delete(`/api/v1/channels/${channel.id}`, {
          headers: { Authorization: `Bearer ${localToken}` },
        })
        .then(() => {
          dispatch({
            type: 'channels/removeChannel',
            payload: { id: channel.id },
          })
          socket.emit('removeChannel', { channelId: channel.id })
        })
        .catch((err) => console.error(err))
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
        # {channel.name}
      </Button>
      <Dropdown align="end" drop="down" className="rounded-0">
        <Dropdown.Toggle
          variant={isActive ? 'primary' : 'light'}
          className={`rounded-0 border-start-0 ${isActive ? 'text-white' : ''}`}
        />
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRenameChannel}>
            Переименовать
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteChannel}>Удалить</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default RemovableChannel
