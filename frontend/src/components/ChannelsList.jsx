import { ListGroup, Button } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import ModalNewChat from './ModalNewChat.jsx'
import RemovableChannel from './channels/RemovableChannel.jsx'
import UnremovableChannel from './channels/UnremovableChannel.jsx'
import { useTranslation } from 'react-i18next'

const ChannelList = ({ channels, activeChannel, onChannelClick }) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const activeChannelRef = useRef(null)

  useEffect(() => {
    if (activeChannelRef.current) {
      activeChannelRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeChannel])

  return (
    <>
      {activeChannel && channels.length ? (
        <div className="d-flex flex-column p-0" style={{ height: '91vh' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">{t('channels')}</h4>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setShowModal(true)}
            >
              +
            </Button>
          </div>
          <ListGroup
            style={{ flex: '1 1 auto', overflowY: 'auto', minHeight: '0' }}
          >
            {channels.map((channel) => (
              <ListGroup.Item
                key={channel.id}
                ref={activeChannel.id === channel.id ? activeChannelRef : null}
                active={channel.id === activeChannel.id}
                className="p-0 border-0"
                action
              >
                {channel.removable ? (
                  <RemovableChannel
                    channel={channel}
                    isActive={channel.id === activeChannel.id}
                    onClick={() => onChannelClick(channel)}
                  />
                ) : (
                  <UnremovableChannel
                    channel={channel}
                    isActive={channel.id === activeChannel.id}
                    onClick={() => onChannelClick(channel)}
                  />
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <p>{t('no_channels')}</p>
      )}
      <ModalNewChat
        showModal={showModal}
        setShowModal={setShowModal}
        channels={channels}
      />
    </>
  )
}

export default ChannelList
