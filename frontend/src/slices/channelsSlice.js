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
    addOneChannel: (state, { payload }) => {
      state.channels.push(payload)
    },
  },
})

export const { addChannels, addOneChannel } = channelsSlice.actions
export default channelsSlice.reducer
