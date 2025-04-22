import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addNewChannel, addChannels } from '../slices/channelsSlice.js'
import Header from './Header.jsx'
import ChannelsList from './ChannelsList.jsx'
import ChatWindow from './ChatWindow.jsx'
import { initializeSocket } from '../socket'

const getChannels = async (userToken) => {
  const response = await axios.get('/api/v1/channels', {
    headers: { Authorization: `Bearer ${userToken}` },
  })
  return response.data
}

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.user.token)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const channels = useSelector((state) => state.channels.channels)
  const [activeChannel, setActiveChannel] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const fetchChannels = async () => {
      try {
        const channelsData = await getChannels(token)
        dispatch(addChannels(channelsData))
        setActiveChannel(channelsData[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchChannels()
  }, [dispatch, isAuthenticated, navigate, token])

  const socket = initializeSocket(token)

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      if (!channels.some((channel) => channel.id === payload.id)) {
        dispatch(addNewChannel(payload))
        setActiveChannel(payload)
      }
    })

    return () => socket.off('newChannel')
  }, [dispatch, channels, socket])

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column p-0"
      style={{ overflow: 'hidden' }}
    >
      <Header />
      <Row className="flex-grow-1">
        <Col md={3} className="bg-light p-3 border-end">
          <ChannelsList
            channels={channels}
            activeChannel={activeChannel}
            onChannelClick={setActiveChannel}
          />
        </Col>
        <Col md={9} className="d-flex flex-column p-0">
          <ChatWindow activeChannel={activeChannel} />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
