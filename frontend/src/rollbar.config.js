const rollbarConfig = {
  accessToken: 'db2977d78de306f3d8d17b9137c1f4bf',
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

export default rollbarConfig
