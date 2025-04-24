import { Button } from 'react-bootstrap'
import leoProfanity from 'leo-profanity'

const UnremovableChannel = ({ channel, isActive, onClick }) => {
  const displayName = leoProfanity.clean(channel.name)

  return (
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
      #{displayName}
    </Button>
  )
}

export default UnremovableChannel
