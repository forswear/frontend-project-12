// src/slices/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addOneMessage: (state, { payload }) => {
      state.messages.push(payload)
    },
  },
})

export const { addOneMessage } = messagesSlice.actions
export default messagesSlice.reducer
