import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      state.messages = payload
    },
    addOneMessage: (state, { payload }) => {
      state.messages.push(payload)
    },
  },
})

export const { addMessages, addOneMessage } = messagesSlice.actions
export default messagesSlice.reducer
