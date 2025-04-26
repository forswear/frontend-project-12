import Rollbar from 'rollbar'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
        guess_uncaught_frames: true,
      },
    },
  },
}

const rollbar = new Rollbar(rollbarConfig)

export default rollbar
