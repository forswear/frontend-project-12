import { Button } from 'react-bootstrap'

const UnremovableChannel = ({ channel, isActive, onClick }) => (
  <Button
    variant={isActive ? 'primary' : 'light'}
    onClick={onClick}
    className={`w-100 text-start rounded-0 border-0 ${
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
)

export default UnremovableChannel
