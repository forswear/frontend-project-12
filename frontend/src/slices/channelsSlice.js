import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      state.channels = payload
    },
    addNewChannel: (state, { payload }) => {
      state.channels.push(payload)
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((c) => c.id !== payload.id)
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find((c) => c.id === payload.id)
      if (channel) channel.name = payload.name
    },
  },
})

export const { addChannels, addNewChannel, removeChannel, renameChannel } =
  channelsSlice.actions

export default channelsSlice.reducer
