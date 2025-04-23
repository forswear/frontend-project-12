import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addChannels } from '../slices/channelsSlice.js'
import Header from './Header.jsx'
import ChannelList from './ChannelsList.jsx'
import ChatWindow from './ChatWindow.jsx'

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
        const response = await axios.get('/api/v1/channels', {
          headers: { Authorization: `Bearer ${token}` },
        })
        dispatch(addChannels(response.data))
        setActiveChannel(response.data[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchChannels()
  }, [dispatch, isAuthenticated, navigate, token])

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column p-0"
      style={{ overflow: 'hidden' }}
    >
      <Header />
      <Row className="flex-grow-1">
        <Col md={3} className="bg-light p-3 border-end">
          <ChannelList
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
